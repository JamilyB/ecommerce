import { useState } from 'react';
import FormField from '../components/FormField';
import PersonalDataTab from '../components/PersonalDataTab';
import AddressesTab from '../components/AddressesTab';
import CardsTab from '../components/CardsTab';

import {
  User,
  MapPin,
  Power,
  CreditCard,
  Plus,
  Trash2,
  Check,
  Mail,
  Phone,
  Calendar,
  Shield,
  Home,
  Building2,
  Edit2,
  X,
  Star,
} from 'lucide-react';

import {
  clientMock,
  addressesMock,
  cardsMock,
} from '../mocks/clientMock';

const TABS = [
  { id: 'personal', label: 'Dados Pessoais', icon: User },
  { id: 'addresses', label: 'Endereços', icon: MapPin },
  { id: 'cards', label: 'Cartões', icon: CreditCard },
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editingProfile, setEditingProfile] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-6 py-16 text-left space-y-10">

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-[#8B645A] uppercase">
          Sua Conta
        </span>

        <h2 className="font-serif text-3xl font-semibold text-[#56443F]">
          Perfil & Configurações
        </h2>

        <p className="text-xs text-[#A28776] font-semibold">
          Gerencie seus dados, endereços e cartões.
        </p>
      </div>

      {/* Avatar + Summary */}
      <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#E4C7B7]/30 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#8B645A] text-[#F1F0E2] flex items-center justify-center font-serif text-xl font-bold flex-shrink-0">
          {clientMock.avatarInitials}
        </div>

        <div className="flex-grow min-w-0">
          <p className="font-bold text-sm text-[#56443F] truncate">
            {clientMock.fullName}
          </p>

          <p className="text-xs text-[#A28776] truncate">
            {clientMock.email}
          </p>

          <div className="flex gap-1.5 mt-1.5">
            <span className="text-[9px] bg-[#E4C7B7]/30 text-[#8B645A] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wide">
              Cliente SURU
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-[#E4C7B7]/30 pb-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-[#56443F] text-[#F1F0E2]'
                  : 'text-[#A28776] hover:bg-[#E4C7B7]/20 hover:text-[#56443F]'
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="max-w-2xl mx-auto">

        {activeTab === 'personal' && (
            <>
              <PersonalDataTab
                userProfile={clientMock}
                editing={editingProfile}
                setEditing={setEditingProfile}
              />
          
              <button
                type="button"
                onClick={() => alert("Conta inativada com sucesso.")}
                className="w-full mt-4 py-3 border border-[#E4C7B7]/40 rounded-lg text-xs font-bold text-[#8B645A] hover:bg-[#E4C7B7]/10"
              >
                Inativar minha conta
              </button>
            </>
          )}

        {activeTab === 'addresses' && (
          <AddressesTab
            savedAddresses={addressesMock}
            showForm={showAddressForm}
            setShowForm={setShowAddressForm}
            editingId={editingAddressId}
            setEditingId={setEditingAddressId}
          />
        )}

        {activeTab === 'cards' && (
          <CardsTab
            savedCards={cardsMock}
            showForm={showCardForm}
            setShowForm={setShowCardForm}
          />
        )}

      </div>
    </div>
  );
};



