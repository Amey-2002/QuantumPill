import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuantumGame = () => {
  // States: 'idle', 'superposition', 'measured'
  const [gameState, setGameState] = useState('idle');
  const [outcomes, setOutcomes] = useState({ particleA: null, particleB: null });

  const startExperiment = () => {
    setGameState('superposition');
    setOutcomes({ particleA: null, particleB: null });
  };

  const measure = () => {
    // In entanglement (specifically Bell State), measuring one determines the other.
    // If A is Up (1), B must be Down (0) - or vice versa.
    const resultA = Math.random() > 0.5 ? 'Spin Up' : 'Spin Down';
    const resultB = resultA === 'Spin Up' ? 'Spin Down' : 'Spin Up';

    setOutcomes({ particleA: resultA, particleB: resultB });
    setGameState('measured');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-cyan-400">Quantum Entanglement Lab</h1>
      
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 w-full max-w-2xl text-center">
        <p className="mb-6 text-slate-300">
          {gameState === 'idle' && "Press Start to entangle two particles."}
          {gameState === 'superposition' && "The particles are now Entangled. Click one to 'Measure' it!"}
          {gameState === 'measured' && "Instant Collapse! Notice how both particles decided their state at the same time."}
        </p>

        <div className="flex justify-around items-center h-48 mb-8 relative">
          {/* Particle A */}
          <QuantumParticle 
            label="Particle A" 
            state={gameState} 
            outcome={outcomes.particleA} 
            onClick={measure}
          />

          {/* Connection Line (Entanglement) */}
          <div className={`h-1 transition-all duration-1000 ${gameState === 'superposition' ? 'w-32 bg-cyan-500 shadow-[0_0_15px_cyan]' : 'w-0 bg-transparent'}`} />

          {/* Particle B */}
          <QuantumParticle 
            label="Particle B" 
            state={gameState} 
            outcome={outcomes.particleB} 
            onClick={measure}
          />
        </div>

        {gameState !== 'superposition' && (
          <button 
            onClick={startExperiment}
            className="bg-cyan-600 hover:bg-cyan-500 px-6 py-2 rounded-full font-bold transition-colors"
          >
            {gameState === 'idle' ? "Start Experiment" : "Reset Lab"}
          </button>
        )}
      </div>
    </div>
  );
};

const QuantumParticle = ({ label, state, outcome, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs uppercase tracking-widest text-slate-500">{label}</span>
      <motion.div
        onClick={state === 'superposition' ? onClick : null}
        animate={state === 'superposition' ? { 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: 360 
        } : { rotate: 0, scale: 1, opacity: 1 }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 cursor-pointer
          ${state === 'superposition' ? 'border-cyan-400 bg-cyan-900/30 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'border-slate-500'}
          ${state === 'measured' ? (outcome === 'Spin Up' ? 'bg-orange-500 border-orange-200' : 'bg-indigo-600 border-indigo-200') : ''}
        `}
      >
        <span className="text-[10px] font-bold">
          {state === 'superposition' ? '???' : outcome}
        </span>
      </motion.div>
    </div>
  );
};

export default QuantumGame;