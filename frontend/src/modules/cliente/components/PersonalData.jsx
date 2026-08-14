import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Edit2,
  Check,
  X,
} from "lucide-react";

function PersonalData({ client }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(client);

  const fields = [
    {
      key: "fullName",
      label: "Nome Completo",
      icon: User,
      type: "text",
    },
    {
      key: "email",
      label: "E-mail",
      icon: Mail,
      type: "email",
    },
    {
      key: "phone",
      label: "Telefone",
      icon: Phone,
      type: "tel",
    },
    {
      key: "cpf",
      label: "CPF",
      icon: Shield,
      type: "text",
    },
    {
      key: "birthDate",
      label: "Data de Nascimento",
      icon: Calendar,
      type: "date",
    },
  ];

  function handleChange(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  function handleSave() {
    setEditing(false);
  }

  function handleCancel() {
    setForm(client);
    setEditing(false);
  }

  return (
    <section className="client-section">

      <div className="section-header">
        <h2>Dados Pessoais</h2>

        {!editing && (
          <button
            className="text-button"
            onClick={() => setEditing(true)}
          >
            <Edit2 size={14} />
            Editar
          </button>
        )}
      </div>

      <div className="client-card">

        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div className="personal-field" key={field.key}>

              <div className="field-icon">
                <Icon size={16} />
              </div>

              <div className="field-content">

                <label>{field.label}</label>

                {editing ? (
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(event) =>
                      handleChange(field.key, event.target.value)
                    }
                  />
                ) : (
                  <p>
                    {field.key === "birthDate"
                      ? new Date(
                          form[field.key] + "T00:00:00"
                        ).toLocaleDateString("pt-BR")
                      : form[field.key]}
                  </p>
                )}

              </div>

            </div>
          );
        })}

        {editing && (
          <div className="form-actions">

            <button
              className="primary-button"
              onClick={handleSave}
            >
              <Check size={15} />
              Salvar
            </button>

            <button
              className="secondary-button"
              onClick={handleCancel}
            >
              <X size={15} />
              Cancelar
            </button>

          </div>
        )}

      </div>

    </section>
  );
}

export default PersonalData;