# Solana钱包连接功能使用指南

## 功能概述

Reveal Platform现已集成完整的Solana钱包连接功能，支持主流钱包连接、余额查询、交易签名等功能。

## 支持的钱包

- **Phantom Wallet** - 最流行的Solana钱包
- **Solflare Wallet** - 功能齐全的Web3钱包  
- **Torus Wallet** - 社交登录钱包
- **Ledger Wallet** - 硬件钱包支持
- **Math Wallet** - 多链钱包

## 主要功能

### 1. 钱包连接
- 一键连接支持的Solana钱包
- 自动检测已安装的钱包
- 安全的授权流程

### 2. 余额查询
- 实时显示SOL余额
- 自动刷新余额数据
- 支持手动刷新

### 3. 网络状态
- 显示当前连接的网络（Devnet/Testnet/Mainnet）
- 网络状态指示器
- RPC连接状态监控

### 4. 地址管理
- 显示完整钱包地址
- 一键复制地址功能
- 地址格式验证

### 5. 快速操作
- 在区块浏览器中查看账户
- 交易历史查询链接
- 网络切换提示

## 技术架构

### 核心依赖
```json
{
  "@solana/wallet-adapter-base": "^0.9.23",
  "@solana/wallet-adapter-react": "^0.15.35", 
  "@solana/wallet-adapter-react-ui": "^0.9.35",
  "@solana/wallet-adapter-wallets": "^0.19.32",
  "@solana/web3.js": "^1.87.6"
}
```

### 组件结构
```
contexts/
  ├── WalletContext.tsx     # 钱包连接上下文
  └── LanguageContext.tsx   # 多语言支持

components/
  ├── WalletButton.tsx      # 钱包连接按钮
  ├── WalletDemo.tsx        # 功能演示组件
  └── Header.tsx            # 导航栏集成

hooks/
  └── useWalletBalance.ts   # 余额查询Hook
```

## 使用方法

### 连接钱包
1. 点击页面右上角的"连接钱包"按钮
2. 选择您偏好的钱包类型
3. 在钱包扩展中确认连接授权
4. 连接成功后即可查看余额和执行操作

### 查看余额
- 连接后自动显示SOL余额
- 点击刷新按钮手动更新余额
- 余额精确到小数点后4位

### 断开连接
1. 点击已连接的钱包按钮
2. 在下拉菜单中选择"断开连接"
3. 确认断开操作

## 网络配置

### 默认设置
- **网络**: Devnet（开发测试网络）
- **RPC端点**: https://api.devnet.solana.com

### 自定义配置
可通过环境变量配置不同网络：

```bash
# Devnet（默认）
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Mainnet
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta  
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# 自定义RPC
NEXT_PUBLIC_SOLANA_RPC_URL=https://rpc.ankr.com/solana_devnet
```

## 安全注意事项

### 用户安全
- **绝不要求用户分享私钥或助记词**
- 所有操作都通过钱包扩展安全执行
- 连接仅获取公开信息（地址、余额）

### 网络安全
- 使用HTTPS连接
- RPC端点验证
- 交易签名验证

### 防钓鱼保护
- 官方网站域名验证
- 钱包连接状态检查
- 安全提示显示

## 故障排除

### 常见问题

**1. 钱包连接失败**
- 确保已安装对应钱包扩展
- 检查浏览器是否允许扩展运行
- 尝试刷新页面重新连接

**2. 余额显示为0**
- 确认钱包地址是否正确
- 检查网络连接状态
- 尝试手动刷新余额

**3. 网络连接问题**
- 检查RPC端点是否可访问
- 确认网络设置正确
- 尝试切换到备用RPC端点

### 错误代码

- `WalletNotConnectedError`: 钱包未连接
- `WalletConnectionError`: 钱包连接失败
- `WalletTimeoutError`: 连接超时
- `NetworkError`: 网络连接错误

## 开发说明

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 钱包测试
1. 安装Phantom或Solflare钱包扩展
2. 创建或导入测试钱包
3. 切换到Devnet网络
4. 在页面上测试连接功能

### 获取测试SOL
- 访问 [Solana Faucet](https://faucet.solana.com/)
- 输入钱包地址获取测试代币
- 用于测试交易功能

## 后续功能计划

- [ ] RCT代币余额显示
- [ ] 质押功能集成
- [ ] 治理投票功能
- [ ] 交易历史查询
- [ ] 多钱包管理
- [ ] 移动端钱包支持

## 技术支持

如遇到问题，请：
1. 查看浏览器控制台错误信息
2. 确认钱包和网络设置
3. 联系开发团队获取支持

---

**注意**: 当前为开发版本，部分功能仅在测试网络可用。正式上线后将支持主网功能。 