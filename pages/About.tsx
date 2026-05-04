import React from 'react';
import { motion } from 'motion/react';
import { Rocket, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    { icon: Rocket, title: 'Rápido', desc: 'Interface veloz e responsiva em qualquer dispositivo.' },
    { icon: ShieldCheck, title: 'Privado', desc: 'Seus dados ficam salvos localmente no seu navegador.' },
    { icon: Zap, title: 'Intuitivo', desc: 'Design focado no que importa: sua lista.' },
    { icon: Sparkles, title: 'Moderno', desc: 'Visual contemporâneo com temas claro e escuro.' },
  ];

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-900 rounded-3xl card-shadow border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10"
    >
      <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">
        Sobre o Projeto
      </h2>
      
      <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          A <span className="font-bold text-indigo-600 dark:text-indigo-400">Lista de Compras Moderna</span> nasceu da necessidade de uma ferramenta simples, porém poderosa, para o dia a dia. Sem anúncios, sem complicações, apenas eficiência.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="text-indigo-600 dark:text-indigo-400 shrink-0">
                <f.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{f.title}</h4>
                <p className="text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">Tecnologias</h3>
          <p className="text-sm">
            Construído com <span className="font-semibold">React 19</span>, <span className="font-semibold">Tailwind CSS</span> para estilização de ponta e <span className="font-semibold">Motion</span> para animações fluidas que dão vida à interface.
          </p>
        </div>

        <p className="text-sm italic text-slate-400 dark:text-slate-500 text-center">
          Versão 2.0 • Desenvolvido com foco total na sua experiência.
        </p>
      </div>
    </motion.div>
  );
};
