// src/pages/Donate.jsx
const PIX_EMAIL = "contatorodrigorodrigues@gmail.com";

export default function Donate() {
  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_EMAIL);
      alert("Chave PIX copiada!");
    } catch {
      alert("Não foi possível copiar.");
    }
  };

  return (
    <section className="card p-5 space-y-5">
      <h2 className="text-lg font-semibold">Doação via PIX</h2>
      <p className="text-sm text-gray-700">
        Escaneie o QR Code abaixo ou copie a chave PIX para realizar sua doação. Muito obrigado! 🙏
      </p>

      <div className="grid gap-4 md:grid-cols-[200px,1fr] items-start">
        {/* QR estático vindo de public/ */}
        <div className="flex items-center justify-center">
          <img
            src="/pix-qr.JPG"
            alt="QR Code PIX para doação"
            className="rounded-xl border border-black/10 max-w-[200px] w-full h-auto"
          />
        </div>

        {/* Chave PIX */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Chave PIX</label>
            <div className="flex items-center gap-2">
              <input className="input" value={PIX_EMAIL} readOnly />
              <button onClick={copyKey} className="btn-ghost">Copiar</button>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            No seu app do banco: <em>PIX → QR Code</em> para escanear, ou <em>PIX → Copia e cola</em> e cole a chave acima.
          </p>
        </div>
      </div>
    </section>
  );
}
