// src/pages/Donate.jsx
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

export default function Donate() {
  const PIX_KEY = import.meta.env.VITE_PIX_KEY || "";
  const stripeUrl = import.meta.env.VITE_DONATE_STRIPE_URL || "";
  const paypalUrl = import.meta.env.VITE_DONATE_PAYPAL_URL || "";

  const [qrDataUrl, setQrDataUrl] = useState("");

  // Gera um payload PIX simples (chave estática). Se tiver PS name/city, dá pra enriquecer.
  const pixPayload = useMemo(() => {
    if (!PIX_KEY) return "";
    // payload básico de “copia e cola” (livre); para E2E perfeito, implemente EMVco / BrCode completo.
    return PIX_KEY;
  }, [PIX_KEY]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!pixPayload) return setQrDataUrl("");
        const dataUrl = await QRCode.toDataURL(pixPayload, { width: 256, margin: 1 });
        if (mounted) setQrDataUrl(dataUrl);
      } catch {
        if (mounted) setQrDataUrl("");
      }
    })();
    return () => { mounted = false; };
  }, [pixPayload]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Chave PIX copiada!");
    } catch {
      alert("Não foi possível copiar.");
    }
  };

  return (
    <section className="card p-5 space-y-5">
      <h2 className="text-lg font-semibold">Apoie este projeto 💜</h2>
      <p className="text-sm text-gray-700">
        Se este app te ajuda, você pode apoiar mantendo o café e os servidores funcionando.
      </p>

      {/* PIX */}
      <div className="grid gap-4 md:grid-cols-[180px,1fr] items-center">
        <div className="flex items-center justify-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code PIX" className="rounded-xl border border-black/10" />
          ) : (
            <div className="text-sm text-gray-500">Sem chave PIX configurada.</div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">PIX</h3>
          {PIX_KEY ? (
            <>
              <p className="text-sm text-gray-700 break-all">
                Chave: <code className="px-1 py-0.5 rounded bg-black/5">{PIX_KEY}</code>
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => copyToClipboard(PIX_KEY)}
                  className="btn-ghost"
                >
                  Copiar chave
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Abra seu banco, escolha <em>PIX &gt; Copia e cola</em>, cole a chave e confirme.
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Configure <code>VITE_PIX_KEY</code> para ativar o PIX.</p>
          )}
        </div>
      </div>

      {/* Outras opções */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="card p-4">
          <h3 className="font-medium mb-2">Cartão (Stripe)</h3>
          {stripeUrl ? (
            <a href={stripeUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Doar via Stripe
            </a>
          ) : (
            <p className="text-sm text-gray-500">
              {/* Configure <code>VITE_DONATE_STRIPE_URL</code> para habilitar. */}
            </p>
          )}
        </div>
        <div className="card p-4">
          <h3 className="font-medium mb-2">PayPal</h3>
          {paypalUrl ? (
            <a href={paypalUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Doar via PayPal
            </a>
          ) : (
            <p className="text-sm text-gray-500">
              {/* Configure <code>VITE_DONATE_PAYPAL_URL</code> para habilitar. */}
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Transparência: nenhuma informação financeira é armazenada por este site. Os pagamentos são processados por provedores externos.
      </p>
    </section>
  );
}
