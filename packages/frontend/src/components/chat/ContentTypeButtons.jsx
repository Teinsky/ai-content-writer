//ai-content-writer/packages/frontend/src/components/chat/ContentTypeButtons.jsxp
import React from 'react';
import { CONTENT_TYPES } from '../../utils/themes';

export function ContentTypeButtons({ onSelectType }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      {CONTENT_TYPES.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelectType(type)}
          className={`group relative overflow-hidden rounded-xl p-4 text-white transition transform hover:scale-105 active:scale-95`}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-100 group-hover:opacity-90 transition`} />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <p className="text-2xl mb-1">{type.label.split(' ')[0]}</p>
            <p className="text-xs font-semibold line-clamp-2">{type.label.split(' ').slice(1).join(' ')}</p>
            <p className="text-xs opacity-80 mt-1">{type.desc}</p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition" />
        </button>
      ))}
    </div>
  );
}

export default ContentTypeButtons;
