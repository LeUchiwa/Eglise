import { useState } from "react";
import { Send, Mail, User, Phone, MessageSquare, CheckCircle2, AlertCircle, MapPin, Clock, Loader2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    newsletter: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      showMessage("error", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage("error", "Veuillez entrer une adresse email valide");
      return;
    }

    setLoading(true);

    // Construction du mailto
    const subject = `Message de ${formData.name} - SDA NDOGBONG`;
    const body = `
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non renseigné'}
Newsletter: ${formData.newsletter ? 'Oui' : 'Non'}

Message:
${formData.message || 'Aucun message'}
    `.trim();

    // Création du lien mailto
    const mailtoLink = `mailto:contact@sdandogbong.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Ouvre le client email par défaut
    window.location.href = mailtoLink;

    // Simule un envoi réussi pour l'interface
    setTimeout(() => {
      showMessage("success", "✅ Message prêt à être envoyé ! Vérifiez votre client email.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        newsletter: true,
      });
      setLoading(false);
    }, 1000);
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 6000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-700 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-3 bg-white/10 rounded-full mb-6">
            <Mail className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nous Contacter</h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto">
            Restez connecté avec SDA NDOGBONG - À l'ombre du Christ
          </p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div
            className={`flex items-center space-x-3 p-4 rounded-lg shadow-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Envoyez-nous un message</h2>
              <p className="text-slate-600">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-slate-500" />
                  Nom complet <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom et prénom"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-slate-500" />
                  Adresse Email <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@example.com"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-slate-500" />
                  Téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+237 6XX XXX XXX"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4 mr-2 text-slate-500" />
                  Votre message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Parlez-nous de votre demande, vos questions, ou comment nous pouvons vous aider..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {/* Newsletter Checkbox */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-slate-600 border-slate-300 rounded focus:ring-2 focus:ring-slate-500 cursor-pointer"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
                      S'inscrire à notre newsletter
                    </span>
                    <p className="text-xs text-slate-600 mt-1">
                      Recevez nos dernières nouvelles, événements et messages spirituels directement dans votre boîte mail.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-4 px-6 rounded-lg font-semibold hover:from-slate-800 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Préparation...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par SDA NDOGBONG.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Adresse</h4>
                    <p className="text-slate-200">
                      SDA NDOGBONG<br />
                      Douala, Cameroun
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <a href="mailto:contact@sdandogbong.com" className="text-slate-200 hover:text-white transition-colors">
                      contact@sdandogbong.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Téléphone</h4>
                    <a href="tel:+237600000000" className="text-slate-200 hover:text-white transition-colors">
                      +237 697 988 479
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Horaires de Culte</h4>
                    <p className="text-slate-200">
                      <strong>Sabbat :</strong> Samedi 9h00 - 13h00<br />
                      <strong>Prière :</strong> Mercredi 18h00 - 20h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Subscribe */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Pourquoi s'inscrire à notre newsletter ?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Recevez les dernières nouvelles de l'église</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Soyez informé des événements à venir</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Accédez à des ressources spirituelles exclusives</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Restez connecté avec la communauté</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Désinscription facile à tout moment</span>
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 border border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Rejoignez notre communauté</h3>
              <p className="text-slate-700 mb-4">
                Ensemble, marchons à l'ombre du Christ et fortifions notre foi en partageant la Parole de Dieu.
              </p>
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Plus de 500 abonnés nous font confiance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous avez des questions ?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            N'hésitez pas à nous contacter. Nous sommes là pour vous accompagner dans votre cheminement spirituel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@sdandogbong.com"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>Envoyer un email</span>
            </a>
            <a
              href="tel:+237600000000"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>Appeler maintenant</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}