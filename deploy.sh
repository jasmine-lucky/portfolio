#!/bin/bash
# Deploy to GitHub Pages (v13-new branch)
set -e

DEPLOY_DIR="../portfolio-deploy-tmp"

echo "🚀 部署到 GitHub Pages..."

# Clean and copy
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp -r out/. "$DEPLOY_DIR/"
cd "$DEPLOY_DIR"

# .nojekyll 防止 GitHub 忽略 _next 文件夹
touch .nojekyll

# Git init and push
git init
git config user.name "jasmine-lucky"
git config user.email "1479776219@qq.com"
git checkout -b v13-new
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push -f git@github.com:jasmine-lucky/portfolio.git v13-new

cd ..
rm -rf "$DEPLOY_DIR"
echo "✅ 部署完成！等30秒后刷新 https://jasmine-lucky.github.io/portfolio"
