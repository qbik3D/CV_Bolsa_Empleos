import React, { useRef } from 'react';
import { Palette, Image, ShieldCheck, Upload, Trash2 } from 'lucide-react';
import { COLOR_THEMES } from '../../constants/defaultData';

export default function ThemeCustomizer({ customization = {}, onChange }) {
  const logoInputRef = useRef(null);

  const handleUpdate = (field, value) => {
    onChange({
      ...customization,
      [field]: value
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate('customLogoUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomLogo = () => {
    handleUpdate('customLogoUrl', '');
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center space-x-1.5">
          <Palette className="w-3.5 h-3.5 text-blue-600" />
          <span>Paleta de Color Principal</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(COLOR_THEMES).map(([key, theme]) => {
            const isSelected = (customization.themeColor || 'navy') === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleUpdate('themeColor', key)}
                className={`p-2.5 rounded-lg border text-left flex items-center space-x-2.5 transition ${
                  isSelected 
                    ? 'border-blue-600 bg-white ring-2 ring-blue-500/20 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div 
                  className="w-5 h-5 rounded-full shadow-inner shrink-0" 
                  style={{ backgroundColor: theme.primary }} 
                />
                <span className="text-xs font-medium text-slate-800 truncate">
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200">
        <label className="flex items-center space-x-2.5 p-2.5 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
          <input
            type="checkbox"
            checked={customization.showPhoto !== false}
            onChange={(e) => handleUpdate('showPhoto', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <div className="text-xs">
            <span className="font-semibold text-slate-800 block">Mostrar Foto en el CV</span>
            <span className="text-slate-500 text-[11px]">Habilitar espacio de foto en barra lateral</span>
          </div>
        </label>

        <label className="flex items-center space-x-2.5 p-2.5 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
          <input
            type="checkbox"
            checked={customization.showCentroBadge !== false}
            onChange={(e) => handleUpdate('showCentroBadge', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <div className="text-xs">
            <span className="font-semibold text-slate-800 block">Sello Centro de Estudiantes</span>
            <span className="text-slate-500 text-[11px]">Validación oficial para la Expo Empleo</span>
          </div>
        </label>
      </div>

      {/* Logo upload slot */}
      <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-800">
              Logo Institucional (Centro de Estudiantes / Expo)
            </span>
          </div>
          {customization.customLogoUrl && (
            <button
              type="button"
              onClick={removeCustomLogo}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center space-x-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Quitar logo personalizado</span>
            </button>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Por defecto se utiliza el emblema vectorial institucional del Centro de Estudiantes. Cuando tengas el archivo de imagen oficial (PNG o SVG con fondo transparente), podés cargarlo aquí:
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={logoInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium border border-slate-300 flex items-center space-x-1.5 transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{customization.customLogoUrl ? 'Reemplazar imagen de logo' : 'Subir archivo de logo'}</span>
          </button>
          {customization.customLogoUrl && (
            <span className="text-xs text-emerald-600 font-medium">
              ✓ Logo cargado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
