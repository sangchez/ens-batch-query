# ENS Batch Query

轻量级 ENS 域名批量查询工具，支持输入多个 ENS 域名，一键查询域名持有地址、反向解析信息及过期时间，查询结果可导出为 CSV 文件，高效便捷。

✨ **在线体验**：[点击这里](https://ens-batch-query.vercel.app)（示例链接，部署后替换）

---

## 🚀 功能特性

- ✅ 批量输入 ENS 域名（每行一个）
- ✅ 查询每个域名的：
  - 持有地址（`addr()`）
  - 反向解析（地址对应的主域名，如有）
  - 过期时间（通过 ETH 注册器合约）
- ✅ 表格展示查询结果
- ✅ 一键导出 CSV
- ✅ 纯前端，无需后端，保护隐私

---

## 🛠️ 技术栈

- Vue3 (Vite)
- ethers.js
- Tailwind CSS（可选，如使用）

---

## 🧪 本地运行

```bash
# 克隆仓库
git clone https://github.com/sangchez/ens-batch-query.git

# 进入目录
cd ens-batch-query

# 安装依赖
yarn

# 启动开发服务器
yarn dev
```

访问 `http://localhost:5173` 即可使用。

> ⚠️ 注意：本地运行需要配置 RPC 节点（默认使用公共节点，可能受限）。建议在 `.env` 文件中设置自己的 Infura/Alchemy 节点：
> ```
> VITE_JSON_RPC_URL=https://mainnet.infura.io/v3/你的项目ID
> ```

---

## 📝 使用说明

1. 在文本框中输入 ENS 域名，每行一个（例如 `vitalik.eth`）。
2. 点击“查询”按钮，等待结果。
3. 表格会显示每个域名的地址、反向解析和过期时间。
4. 点击“导出 CSV”下载结果文件。

> 🔍 提示：如果某些域名查询失败（如未注册），表格中会显示“未找到”。公共 RPC 可能有限流，建议使用自己的 RPC 节点。

---

## 🤝 反馈与贡献

- 如果你遇到 bug 或有新功能建议，欢迎提交 [Issue](https://github.com/sangchez/ens-batch-query/issues)
- 如果你有好的想法，欢迎 Fork 并提交 Pull Request

---

## 📄 许可证

[MIT](LICENSE)

---

## 🙋‍♂️ 关于作者

独立开发者，专注于 Web3 工具开发。  
如果你有定制开发需求，欢迎联系：sangshui.ace@gmail.com

---

> ⚡ 本项目是作者试错期的 MVP 产品，旨在验证需求并积累技术模块。如果你觉得有用，欢迎分享给更多人！