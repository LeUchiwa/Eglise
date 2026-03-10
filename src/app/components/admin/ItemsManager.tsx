import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Upload,
  Loader2,
  Download,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

interface Item {
  id: string;
  [key: string]: any;
}

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "file" | "date";
  placeholder?: string;
  required?: boolean;
  accept?: string; // For file inputs
}

interface ItemsManagerProps {
  title: string;
  storageKey: string;
  fields: Field[];
  apiBase: string;
  accessToken: string;
  onUpdate?: () => void;
}

export function ItemsManager({
  title,
  storageKey,
  fields,
  apiBase,
  accessToken,
  onUpdate,
}: ItemsManagerProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Item>>({});
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, [storageKey]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/content/${storageKey}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (data.success && data.value) {
        const parsedItems = JSON.parse(data.value);
        setItems(Array.isArray(parsedItems) ? parsedItems : []);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error loading items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const saveItems = async (newItems: Item[]) => {
    setSaving(true);
    try {
      const response = await fetch(`${apiBase}/content`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: storageKey,
          value: JSON.stringify(newItems),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setItems(newItems);
        onUpdate?.();
        return true;
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (error) {
      console.error("Error saving items:", error);
      alert("Erreur lors de la sauvegarde");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    const newItem: Partial<Item> = {
      id: Date.now().toString(),
    };
    fields.forEach((field) => {
      newItem[field.key] = "";
    });
    setEditForm(newItem);
    setEditingId("new");
  };

  const handleEdit = (item: Item) => {
    setEditForm({ ...item });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      return;
    }

    const newItems = items.filter((item) => item.id !== id);
    await saveItems(newItems);
  };

  const handleSave = async () => {
    // Validation
    const missingFields = fields
      .filter((f) => f.required && !editForm[f.key])
      .map((f) => f.label);

    if (missingFields.length > 0) {
      alert(`Champs requis manquants : ${missingFields.join(", ")}`);
      return;
    }

    let newItems;
    if (editingId === "new") {
      newItems = [...items, editForm as Item];
    } else {
      newItems = items.map((item) =>
        item.id === editingId ? (editForm as Item) : item
      );
    }

    const success = await saveItems(newItems);
    if (success) {
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleFileUpload = async (fieldKey: string, file: File, accept?: string) => {
    if (!file) return;

    setUploading(fieldKey);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${apiBase}/storage/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        setEditForm((prev) => ({ ...prev, [fieldKey]: data.url }));
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Erreur upload: ${error.message}`);
    } finally {
      setUploading(null);
    }
  };

  const renderFormField = (field: Field) => {
    const value = editForm[field.key] || "";

    if (field.type === "image") {
      return (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {value && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={value}
                alt={field.label}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                {uploading === field.key ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Upload...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span>Image</span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(field.key, file);
                }}
                disabled={uploading === field.key}
              />
            </label>
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, [field.key]: e.target.value }))
            }
            placeholder={field.placeholder || "URL de l'image"}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      );
    }

    if (field.type === "file") {
      return (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {value && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800 flex-1 truncate">
                Fichier uploadé
              </span>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          )}

          <label className="cursor-pointer">
            <div className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
              {uploading === field.key ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Upload...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Uploader PDF</span>
                </>
              )}
            </div>
            <input
              type="file"
              accept={field.accept || ".pdf"}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(field.key, file, field.accept);
              }}
              disabled={uploading === field.key}
            />
          </label>

          <input
            type="text"
            value={value}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, [field.key]: e.target.value }))
            }
            placeholder={field.placeholder || "URL du fichier"}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            value={value}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, [field.key]: e.target.value }))
            }
            placeholder={field.placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      );
    }

    return (
      <div key={field.key} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={field.type}
          value={value}
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, [field.key]: e.target.value }))
          }
          placeholder={field.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{items.length} élément(s)</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Edit Form */}
      {editingId && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              {editingId === "new" ? "Nouvel élément" : "Modifier l'élément"}
            </h4>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mb-4">{fields.map(renderFormField)}</div>

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sauvegarde...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Items List */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">Aucun élément. Cliquez sur "Ajouter" pour commencer.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {fields.slice(0, 3).map((field) => {
                    const value = item[field.key];
                    if (!value) return null;

                    if (field.type === "image") {
                      return (
                        <div key={field.key} className="mb-2">
                          <img
                            src={value}
                            alt={field.label}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={field.key} className="mb-2">
                        <span className="text-xs text-gray-500 font-medium">
                          {field.label}:
                        </span>
                        <p className="text-sm text-gray-900">
                          {value.length > 100
                            ? value.substring(0, 100) + "..."
                            : value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
