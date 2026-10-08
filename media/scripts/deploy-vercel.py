#!/usr/bin/env python3
"""ビルド済みの dist/ を Vercel の本番にデプロイする（標準ライブラリのみ）。

使い方:  npm run build && python3 scripts/deploy-vercel.py
必要な環境変数: VERCEL_TOKEN（Vercel のアクセストークン）
任意: VERCEL_TEAM_ID, VERCEL_PROJECT（既定は yupir）
"""
import hashlib, json, os, sys, time, urllib.request, urllib.error

TEAM = os.environ.get("VERCEL_TEAM_ID", "team_5SWY3T1pWSvTUq5uQmjA0Yqp")
PROJECT = os.environ.get("VERCEL_PROJECT", "yupir")
TOKEN = os.environ.get("VERCEL_TOKEN")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if not TOKEN:
    sys.exit("VERCEL_TOKEN が設定されていません。")


def call(method, url, body=None, tries=5):
    data = json.dumps(body).encode() if body is not None else None
    for n in range(tries):
        req = urllib.request.Request(url, data=data, method=method, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")[:500]
            if e.code < 500 and e.code != 429:
                sys.exit(f"Vercel API {e.code}: {detail}")
            err = f"{e.code} {detail}"
        except (urllib.error.URLError, ConnectionError, TimeoutError) as e:
            err = str(e)
        print(f"リトライ {n + 1}/{tries}: {err}", file=sys.stderr)
        time.sleep(2 * (n + 1))
    sys.exit("Vercel API に接続できませんでした。")


dist = os.path.join(ROOT, "dist")
if not os.path.isdir(dist):
    sys.exit("dist/ がありません。先に npm run build を実行してください。")

def upload(blob):
    """本文を /v2/files に送り、sha1 を返す（デプロイ本体は参照だけにして 10MB 制限を避ける）。"""
    sha = hashlib.sha1(blob).hexdigest()
    for n in range(5):
        req = urllib.request.Request(f"https://api.vercel.com/v2/files?teamId={TEAM}", data=blob, method="POST",
                                     headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/octet-stream",
                                              "x-vercel-digest": sha, "Content-Length": str(len(blob))})
        try:
            with urllib.request.urlopen(req, timeout=120):
                return sha
        except urllib.error.HTTPError as e:
            if e.code < 500 and e.code != 429:
                sys.exit(f"Vercel upload {e.code}: {e.read().decode(errors='replace')[:300]}")
        except (urllib.error.URLError, ConnectionError, TimeoutError):
            pass
        time.sleep(2 * (n + 1))
    sys.exit("ファイルのアップロードに失敗しました。")


files = []
for base, _, names in os.walk(dist):
    for name in names:
        path = os.path.join(base, name)
        with open(path, "rb") as f:
            blob = f.read()
        files.append({"file": os.path.relpath(path, dist).replace(os.sep, "/"), "sha": upload(blob), "size": len(blob)})

# 配信設定（ヘッダー・末尾スラッシュ）は vercel.json から引き継ぐ
with open(os.path.join(ROOT, "vercel.json"), encoding="utf-8") as f:
    src = json.load(f)
cfg = json.dumps({"trailingSlash": src.get("trailingSlash", True), "headers": src.get("headers", [])}).encode()
files.append({"file": "vercel.json", "sha": upload(cfg), "size": len(cfg)})

dep = call("POST", f"https://api.vercel.com/v13/deployments?teamId={TEAM}&skipAutoDetectionConfirmation=1",
           {"name": PROJECT, "project": PROJECT, "target": "production", "files": files, "projectSettings": {"framework": None}})
dep_id = dep["id"]
print(f"デプロイ開始: {dep_id}（{len(files)} ファイル）")

state = dep.get("readyState")
for _ in range(60):
    if state in ("READY", "ERROR", "CANCELED"):
        break
    time.sleep(3)
    d = call("GET", f"https://api.vercel.com/v13/deployments/{dep_id}?teamId={TEAM}")
    state = d.get("readyState")
    if state == "ERROR":
        print(d.get("errorMessage"), file=sys.stderr)
print(f"結果: {state}")
if state != "READY":
    sys.exit(1)
print("公開しました。")
