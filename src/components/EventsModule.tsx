import React, { useState } from 'react';
import { EcosystemEvent, Language } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  PlusCircle, 
  ExternalLink, 
  Video, 
  Sparkles, 
  Users, 
  X, 
  CheckCircle2,
  Filter
} from 'lucide-react';

interface EventsModuleProps {
  language: Language;
  events: EcosystemEvent[];
  onAddEvent: (event: EcosystemEvent) => void;
}

export const EventsModule: React.FC<EventsModuleProps> = ({
  language,
  events,
  onAddEvent
}) => {
  const isAr = language === 'ar';
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Submit Form state
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [type, setType] = useState<EcosystemEvent['type']>('pitch');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationAr, setLocationAr] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);
  const [descriptionEn, setDescriptionEn] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const eventTypes = [
    { id: 'all', labelEn: 'All Events', labelAr: 'كافة الفعاليات' },
    { id: 'pitch', labelEn: 'Pitch & Demo Days', labelAr: 'عروض المستثمرين' },
    { id: 'conference', labelEn: 'Conferences & Summits', labelAr: 'المؤتمرات والقمم' },
    { id: 'workshop', labelEn: 'Workshops & Legal', labelAr: 'ورش العمل والتدريب' },
    { id: 'meetup', labelEn: 'Founder Meetups', labelAr: 'لقاءات رواد الأعمال' }
  ];

  const filteredEvents = events.filter(e => selectedType === 'all' || e.type === selectedType);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: EcosystemEvent = {
      id: `ev-${Date.now()}`,
      titleEn,
      titleAr: titleAr || titleEn,
      organizer,
      type,
      date,
      time: time || '10:00 – 13:00 AST',
      location: isVirtual ? 'Virtual Stream' : location,
      locationAr: isVirtual ? 'بث افتراضي' : (locationAr || location),
      isVirtual,
      descriptionEn,
      descriptionAr: descriptionEn,
      registrationUrl: registrationUrl || 'https://ventures.qa/events',
      isFeatured: false
    };

    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
    } catch (err) {
      console.error(err);
    }

    onAddEvent(newEvent);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#C5A059]/20 text-[#8A1538] font-mono">
              {isAr ? 'روزنامة الفعاليات' : 'ECOSYSTEM CALENDAR'}
            </span>
            <span className="text-xs text-[#7A6D6D]">
              • {isAr ? 'ملتقيات رأس المال الجريء والمستثمرين' : 'Venture Summits, Pitch Days & Meetups in Doha'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1E1919] tracking-tight">
            {isAr ? 'فعاليات وملتقيات الاستثمار' : 'Ecosystem Events & Summits'}
          </h2>
          <p className="text-xs text-[#5A4E4E] max-w-2xl mt-1">
            {isAr
              ? 'تجمع موحد لكافة مؤتمرات التقنية، وأيام عروض الشركات الناشئة، واللقاءات الحصرية للمستثمرين الملائكيين في دولة قطر.'
              : 'The verified schedule of technology demo days, investor pitch sessions, regulatory roundtables, and tech founder networking in Doha.'}
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isAr ? 'إضافة فعالية جديدة' : 'Submit an Event'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {eventTypes.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedType === t.id
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'bg-white hover:bg-[#FAF8F5] text-[#5A4E4E] border border-[#E8DFC8]'
            }`}
          >
            {isAr ? t.labelAr : t.labelEn}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-[#E8DFC8] hover:border-[#8A1538] hover:shadow-lg transition-all p-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FAF8F5] text-[#8A1538] border border-[#E8DFC8] font-mono">
                    {event.type}
                  </span>
                  {event.isFeatured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C5A059] text-[#1E1919] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-center min-w-[64px]">
                  <span className="text-[10px] text-[#8A1538] uppercase font-black block">
                    {new Date(event.date).toLocaleString('en-US', { month: 'short' })}
                  </span>
                  <strong className="text-lg font-black text-[#1E1919] block leading-none">
                    {new Date(event.date).getDate()}
                  </strong>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1E1919] leading-snug">
                  {isAr ? event.titleAr : event.titleEn}
                </h3>
                <span className="text-xs text-[#7A6D6D] mt-0.5 block">
                  {isAr ? 'المنظم: ' : 'Organized by: '}{event.organizer}
                </span>
              </div>

              <p className="text-xs text-[#5A4E4E] leading-relaxed">
                {isAr ? event.descriptionAr : event.descriptionEn}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#FAF8F5] space-y-3">
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#7A6D6D]">
                <div className="flex items-center gap-1.5 truncate">
                  <Clock className="w-3.5 h-3.5 text-[#8A1538] shrink-0" />
                  <span className="truncate">{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  {event.isVirtual ? (
                    <Video className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                  <span className="truncate">{isAr ? event.locationAr : event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>{isAr ? 'التسجيل وتفاصيل الحضور' : 'Register / View Details'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Event Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-lg shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#8A1538] text-white p-5 relative shrink-0">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-white/80 hover:text-white bg-black/20"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold">
                {isAr ? 'إدراج فعالية جديدة في الروزنامة' : 'Submit an Ecosystem Event'}
              </h3>
              <p className="text-xs text-white/80">
                {isAr ? 'فعاليات الشركات الناشئة والاستثمار في قطر' : 'Free listing for verified tech & venture ecosystem events'}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4">
              {submittedSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-[#1E1919]">
                    {isAr ? 'تم استلام الفعالية وإدراجها بنجاح!' : 'Event Successfully Published!'}
                  </h4>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                      {isAr ? 'عنوان الفعالية (بالإنجليزية) *' : 'Event Title (English) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Qatar AI Health Summit 2026"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                      {isAr ? 'عنوان الفعالية (بالعربية)' : 'Event Title (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      placeholder="مثال: قمة الذكاء الاصطناعي الصحي في قطر"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                        {isAr ? 'نوع الفعالية *' : 'Event Type *'}
                      </label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as EcosystemEvent['type'])}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                      >
                        <option value="pitch">Pitch & Demo Day</option>
                        <option value="conference">Conference / Summit</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Founder Meetup</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                        {isAr ? 'الجهة المنظمة *' : 'Organizer *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={organizer}
                        onChange={(e) => setOrganizer(e.target.value)}
                        placeholder="e.g. FinTech Syndicate"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                        {isAr ? 'التاريخ *' : 'Event Date *'}
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                        {isAr ? 'التوقيت *' : 'Timing *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="10:00 – 14:00 AST"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                      {isAr ? 'المكان أو الرابط الافتراضي *' : 'Location / Venue *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. West Bay Hotel & Conference Center"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                      {isAr ? 'رابط التسجيل أو التذاكر' : 'Registration URL'}
                    </label>
                    <input
                      type="url"
                      value={registrationUrl}
                      onChange={(e) => setRegistrationUrl(e.target.value)}
                      placeholder="https://event.qa/register"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                      {isAr ? 'نبذة عن الفعالية *' : 'Event Description *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={descriptionEn}
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      placeholder="Describe target attendees, agenda highlights..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      {isAr ? 'نشر الفعالية فوراً' : 'Publish Event'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
