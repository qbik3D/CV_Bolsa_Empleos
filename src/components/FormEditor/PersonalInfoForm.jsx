import React, { useRef } from 'react';
import { User, Mail, Phone, MapPin, Camera, Trash2, Eye, EyeOff } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export default function PersonalInfoForm({ data, onChange }) {
  const fileInputRef = useRef(null);

  const handleFieldChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen debe ser menor a 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFieldChange('photoUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    handleFieldChange('photoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Photo Uploader */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="relative group shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-300 flex items-center justify-center shadow-inner">
            {data.photoUrl ? (
              <img 
                src={data.photoUrl} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <User className="w-10 h-10 text-slate-400" />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition"
            title="Subir foto de perfil"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Foto de Perfil (Opcional)
            </h4>
            <p className="text-xs text-slate-500">
              Formato JPG o PNG, preferentemente con fondo neutro y buena iluminación.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg shadow-sm transition"
            >
              Seleccionar foto
            </button>
            {data.photoUrl && (
              <button
                type="button"
                onClick={removePhoto}
                className="px-2.5 py-1 text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition flex items-center space-x-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Quitar</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => handleFieldChange('showPhoto', !data.showPhoto)}
              className={`px-2.5 py-1 text-xs font-medium border rounded-lg transition flex items-center space-x-1 ${
                data.showPhoto 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}
            >
              {data.showPhoto ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{data.showPhoto ? 'Visible en CV' : 'Oculta en CV'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main personal fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nombre y Apellido *
          </label>
          <input
            type="text"
            value={data.fullName || ''}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            placeholder="Ej: Lucía Florencia Benítez"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Titular Profesional / Perfil *
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Ej: Estudiante de Ingeniería en Informática | Desarrolladora Web Jr."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
            <Mail className="w-3 h-3 text-slate-400" />
            <span>Correo Electrónico *</span>
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="ejemplo@estudiantes.unlam.edu.ar"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
            <Phone className="w-3 h-3 text-slate-400" />
            <span>Teléfono / WhatsApp *</span>
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="+54 9 11 3456-7890"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Localidad y Provincia</span>
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="San Justo, Buenos Aires"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
            <LinkedinIcon className="w-3 h-3 text-slate-400" />
            <span>LinkedIn (Perfil o URL)</span>
          </label>
          <input
            type="text"
            value={data.linkedin || ''}
            onChange={(e) => handleFieldChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/tu-usuario"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1">
            <GithubIcon className="w-3 h-3 text-slate-400" />
            <span>GitHub / Portfolio / Web</span>
          </label>
          <input
            type="text"
            value={data.github || ''}
            onChange={(e) => handleFieldChange('github', e.target.value)}
            placeholder="github.com/tu-usuario"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            DNI (Opcional)
          </label>
          <input
            type="text"
            value={data.dni || ''}
            onChange={(e) => handleFieldChange('dni', e.target.value)}
            placeholder="Opcional"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
