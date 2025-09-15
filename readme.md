# Lista de Compras — Guia de Instalação e Uso

Este README explica como rodar o projeto **localmente** (backend + frontend), quais **variáveis de ambiente** (.env) configurar e como **testar a API**.

> Stack típica do projeto:
> - **Backend**: Python (Flask *ou* FastAPI), arquivo `app.py`, porta padrão **8000**
> - **Frontend**: React + Vite, porta padrão **5173/5174**

Se o seu `app.py` for Flask, use os comandos do Flask; se for FastAPI, use os comandos do Uvicorn (ambos estão detalhados abaixo).

---

## 1) Pré‑requisitos

- **Python** 3.10+ (recomendado 3.11+)
- **pip** e **venv**
- **Node.js** 18+ e **npm** (ou **pnpm/yarn**, se preferir)
- **Git**
- macOS: é útil ter o **Homebrew** (`brew`) para instalar dependências opcionais

---

## 2) Clonar o repositório

```bash
# via HTTPS
git clone https://github.com/guigomaster01/lista-de-compras.git
cd lista-de-compras
```

> Dica: Se você está usando SSH, ajuste a URL conforme seu setup.

---

## 3) Variáveis de ambiente (.env)

O projeto usa dois `.env`:

- **Backend**: `./.env` (raiz do backend ou da repo, onde fica o `app.py`)
- **Frontend**: `./frontend/.env.local` (ou `./web/.env.local`, conforme a pasta do seu front)

> Os nomes das pastas podem variar. Adapte os caminhos abaixo para onde seu backend e frontend realmente estão.

### 3.1 Backend — `.env`

Crie um arquivo `.env` ao lado do `app.py` contendo, por exemplo:

```dotenv
# Ambiente
APP_ENV=development
LOG_LEVEL=INFO

# Network (ajuste se desejar outras portas)
HOST=127.0.0.1
PORT=8000

# CORS — coloque as origens do seu frontend (inclua localhost e 127.0.0.1)
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174

# (Opcional) Banco de dados — se seu app usar DB, deixe um padrão simples
DATABASE_URL=sqlite:///shopping.db

# (Flask) variáveis úteis
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=troque_esta_string_segura
```

> Se você **não usa DB**, a variável `DATABASE_URL` é ignorada. Se usa **MongoDB**, troque por `MONGODB_URI=mongodb+srv://...` e ajuste o código conforme seu driver.

### 3.2 Frontend — `.env.local`

Na pasta do frontend (ex.: `frontend/` ou `web/`), crie um arquivo `.env.local` com:

```dotenv
# URL base da API (mantenha a mesma origem/host configurada no backend)
VITE_API_URL=http://127.0.0.1:8000
```

> Importante: **localhost** e **127.0.0.1** são origens diferentes para CORS. Se o front rodar em `http://localhost:5173`, inclua `http://localhost:5173` em `CORS_ALLOWED_ORIGINS`.

---

## 4) Backend — Instalação e execução

Do diretório onde está o `app.py`:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Se for **Flask** (`app.py` cria `app = Flask(__name__)`):

```bash
# carrega o .env automaticamente via python-dotenv (se instalado)
flask run --host="$HOST" --port="$PORT"
# ou, sem variáveis: flask run --host=127.0.0.1 --port=8000
```

### Se for **FastAPI** (`app.py` ou `main.py` cria `app = FastAPI()`):

```bash
# ajuste o nome do módulo: app:app significa arquivo app.py contendo a variável app
uvicorn app:app --host "$HOST" --port "$PORT" --reload
```

> Se aparecer erro de CORS (preflight/OPTIONS), verifique a seção **CORS** abaixo.

---

## 5) Frontend — Instalação e execução

Entre na pasta do frontend (`frontend/` ou `web/`):

```bash
npm install
npm run dev
```

Acesse a URL que o Vite mostrar (ex.: `http://localhost:5173`). Garanta que `VITE_API_URL` aponte para o backend (ex.: `http://127.0.0.1:8000`).

Para build de produção:

```bash
npm run build
npm run preview   # serve o build para testes locais
```

---

## 6) Endpoints da API (exemplo)

> Ajuste os exemplos conforme sua implementação. Abaixo, um contrato típico para a rota `/items`.

### GET `/items`
Retorna a lista de itens.

```bash
curl -X GET "http://127.0.0.1:8000/items"
```

**Resposta (exemplo):**
```json
[
  {"id": 1, "name": "Arroz", "quantity": 2, "price": 21.90},
  {"id": 2, "name": "Feijão", "quantity": 1, "price": 8.50}
]
```

### POST `/items`
Cria um item.

```bash
curl -X POST "http://127.0.0.1:8000/items" \
  -H "Content-Type: application/json" \
  -d '{"name":"Leite","quantity":3,"price":4.99}'
```

**Resposta (exemplo):**
```json
{"id": 3, "name": "Leite", "quantity": 3, "price": 4.99}
```

### PUT `/items/{id}`
Atualiza parcialmente ou totalmente um item (nome, quantidade e/ou preço).

```bash
curl -X PUT "http://127.0.0.1:8000/items/3" \
  -H "Content-Type: application/json" \
  -d '{"price":5.49,"quantity":2}'
```

**Resposta (exemplo):**
```json
{"id": 3, "name": "Leite", "quantity": 2, "price": 5.49}
```

### DELETE `/items/{id}`
Remove um item.

```bash
curl -X DELETE "http://127.0.0.1:8000/items/3"
```

**Resposta (exemplo):**
```json
{"deleted": 1}
```

---

## 7) Exemplo de consumo no Frontend (Axios)

```ts
// supondo Vite
const API_URL = import.meta.env.VITE_API_URL;

export async function createItem(item) {
  const { data } = await axios.post(`${API_URL}/items`, item);
  return data;
}

export async function listItems() {
  const { data } = await axios.get(`${API_URL}/items`);
  return data;
}

export async function updateItem(id, patch) {
  const { data } = await axios.put(`${API_URL}/items/${id}`, patch);
  return data;
}

export async function deleteItem(id) {
  const { data } = await axios.delete(`${API_URL}/items/${id}`);
  return data;
}
```

---

## 8) CORS — configuração no Backend

Caso veja erro tipo **“Response to preflight request doesn't pass access control check”**:

### Em **Flask**

```python
# app.py
import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
origins = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",") if os.getenv("CORS_ALLOWED_ORIGINS") else ["*"]
CORS(app, origins=origins, supports_credentials=True)
```

### Em **FastAPI**

```python
# app.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",") if os.getenv("CORS_ALLOWED_ORIGINS") else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

> **Dica:** Use **sempre** a mesma origem (ex.: todas em `localhost` ou todas em `127.0.0.1`) para evitar confusão.

---

## 9) Scripts úteis

No **backend** você pode criar um `Makefile` (opcional):

```Makefile
.PHONY: venv run fmt lint
venv:
	python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt
run:
	flask run --host=$$HOST --port=$$PORT
fmt:
	ruff check --fix . || true
lint:
	ruff check .
```

No **frontend** (Vite), verifique no `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview -p 5174"
  }
}
```

---

## 10) Troubleshooting

- **CORS / Preflight (OPTIONS)**: confira `CORS_ALLOWED_ORIGINS` e se o middleware de CORS está habilitado.
- **Porta ocupada**: troque `PORT` no backend ou a porta do Vite (`npm run preview -p 5174`).
- **Axios apontando para host diferente**: confirme `VITE_API_URL` e se o front está consumindo exatamente essa variável.
- **SQLite permissão/caminho**: garanta que a pasta é gravável; use caminho absoluto se necessário.
- **GitHub push (auth)**: use **PAT** (token pessoal) ou **SSH**; credenciais antigas no Keychain podem causar `Invalid username or token`.

---

## 11) Estrutura sugerida de pastas

```
lista-de-compras/
├─ app.py                 # backend (Flask ou FastAPI)
├─ requirements.txt       # dependências do backend
├─ .env                   # variáveis do backend
├─ shopping.db            # (opcional) SQLite local
├─ frontend/              # pasta do frontend (React + Vite)
│  ├─ src/
│  ├─ package.json
│  └─ .env.local          # variáveis do frontend
└─ README.md
```

---

## 12) Licença

Defina a licença do projeto (MIT/Apache-2.0/etc.) conforme sua preferência.

---

## 13) Próximos passos

- Adicionar testes (PyTest no backend; Vitest/RTL no frontend)
- Adicionar CI (lint + testes)
- Deploy (Render/Fly.io/Heroku/railway para API; Vercel/Netlify para front) — lembre de ajustar CORS no deploy

