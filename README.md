# 📝 TipJar - Contrato de Propinas en Ethereum

## 🎯 Descripción

Este proyecto implementa un contrato inteligente llamado **TipJar** que permite a los usuarios enviar propinas en ETH con un mensaje, y permite al owner retirar los fondos.

El contrato está desplegado en la testnet **Sepolia**.

---

## 🚀 Tecnologías

- Solidity
- Hardhat
- Ethers.js
- Sepolia testnet

---

## 🛠️ Instalación

1️⃣ Clona el repositorio:

```bash
git clone https://github.com/jorge210488/tipjar-hardhat.git
cd tipjar-hardhat
```

2️⃣ Instala dependencias:

```bash
npm install
```

3️⃣ Crea un archivo `.env` con la siguiente estructura:

```env
SEPOLIA_URL=https://sepolia.infura.io/v3/TU_API_KEY
PRIVATE_KEY=TU_PRIVATE_KEY
```

**IMPORTANTE:** no subas el `.env` al repositorio público.

---

## 📦 Scripts disponibles

### 👉 Compilar el contrato:

```bash
npx hardhat compile
```

### 👉 Ejecutar los tests:

```bash
npx hardhat test
```

### 👉 Desplegar el contrato en Sepolia:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 👉 Interactuar con el contrato:

```bash
npx hardhat run scripts/interact.js --network sepolia
```

---

## 🧪 Tests realizados

- ✅ Recepción de propinas y emisión del evento.
- ✅ Restricción de `withdraw()` solo al owner.
- ✅ Correcta actualización del balance.

---

## 🚀 Bonus implementado

- ✅ Struct `Tipper`, `message`, `timestamp`.
- ✅ Array de propinas.

---

## 📄 Estado actual

✅ Contrato desplegado en Sepolia: [0xACa72829a06c263e34a984a6AF2ED967676773c7](https://sepolia.etherscan.io/address/0xACa72829a06c263e34a984a6AF2ED967676773c7)

---

## 💻 Autor

- \[Jorge Martínez]
- [Tu GitHub](https://github.com/jorge210488)
