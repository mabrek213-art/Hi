import React, { useState, useMemo } from 'react';
import { Language, EntityProfile, CapitalIndexQuarter, RaisingOpportunity } from '../types';
import { 
  X, 
  Code, 
  Copy, 
  Check, 
  Terminal, 
  Play, 
  Database, 
  Lock, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

interface PublicApiModalProps {
  entities: EntityProfile[];
  capitalIndex: CapitalIndexQuarter[];
  raisingDeals: RaisingOpportunity[];
  language: Language;
  onClose: () => void;
}

export const PublicApiModal: React.FC<PublicApiModalProps> = ({
  entities,
  capitalIndex,
  raisingDeals,
  language,
  onClose
}) => {
  const isAr = language === 'ar';
  const [selectedEndpoint, setSelectedEndpoint] = useState<'/api/v1/entities' | '/api/v1/index/qpci' | '/api/v1/deals'>('/api/v1/entities');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const sampleApiKey = 'vqa_live_9f82c4e81a304df986e7a2b910c';

  // Compute live JSON response based on selected endpoint & filters
  const responseData = useMemo(() => {
    if (selectedEndpoint === '/api/v1/entities') {
      const list = sectorFilter === 'all' 
        ? entities 
        : entities.filter(e => e.sector === sectorFilter);

      return {
        status: 'success',
        endpoint: '/api/v1/entities',
        total: list.length,
        timestamp: new Date().toISOString(),
        data: list.slice(0, 5).map(e => ({
          id: e.id,
          name: e.name,
          name_ar: e.nameAr,
          slug: e.slug,
          type: e.type,
          sector: e.sector,
          stage: e.stage,
          funding_raised_usd: e.totalFundingRaisedUsd,
          funding_raised_qar: e.totalFundingRaisedQar,
          aum_usd: e.aumUsd,
          headquarters: e.headquarters,
          verified: e.verified,
          institutional_backing: e.institutionalBacking,
          website: e.website
        }))
      };
    } else if (selectedEndpoint === '/api/v1/index/qpci') {
      return {
        status: 'success',
        endpoint: '/api/v1/index/qpci',
        quarter: capitalIndex[0]?.quarter,
        benchmark: 'Qatar Private Capital Index',
        data: capitalIndex
      };
    } else {
      return {
        status: 'success',
        endpoint: '/api/v1/deals',
        count: raisingDeals.length,
        data: raisingDeals.map(d => ({
          deal_id: d.id,
          company: d.companyName,
          sector: d.sector,
          round_stage: d.roundStage,
          target_usd: d.targetAmountUsd,
          target_qar: d.targetAmountQar,
          traction_arr: d.tractionARRUsd,
          status: d.status
        }))
      };
    }
  }, [selectedEndpoint, sectorFilter, entities, capitalIndex, raisingDeals]);

  const jsonString = JSON.stringify(responseData, null, 2);

  const curlCommand = `curl -X GET "https://ventures.qa${selectedEndpoint}${sectorFilter !== 'all' ? `?sector=${sectorFilter}` : ''}" \\
  -H "Authorization: Bearer ${sampleApiKey}" \\
  -H "Accept: application/json"`;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(sampleApiKey);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1E1919] text-white p-6 border-b border-[#332B2B] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-white/70 hover:text-white rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8A1538] flex items-center justify-center text-[#C5A059] font-mono font-bold">
              API
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">
                  {isAr ? 'واجهة برمجة التطبيقات المفتوحة (API)' : 'Ventures.qa Public Capital API'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#8A1538] text-white font-bold">
                  v1.2 REST
                </span>
              </div>
              <p className="text-xs text-[#A09898]">
                {isAr ? 'تغذية بيانات لحظية للمصارف، وشاشات بلومبرغ، وبيوت الأبحاث المالية' : 'Direct JSON endpoints for Bloomberg terminals, banks, and academic institutions'}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* API Token Simulator */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#6B5E5E] uppercase block">{isAr ? 'مفتاح الاستعلام المؤسسي:' : 'Public Sandbox Bearer Token:'}</span>
              <code className="font-mono text-xs text-[#8A1538] font-bold">{sampleApiKey}</code>
            </div>
            <button
              onClick={handleCopyToken}
              className="px-3 py-1.5 bg-white border border-[#D5C9B8] rounded-lg font-bold text-[#1E1919] hover:bg-[#F2ECE4] flex items-center gap-1.5 transition-all"
            >
              {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedToken ? (isAr ? 'تم النسخ' : 'Copied Key') : (isAr ? 'نسخ المفتاح' : 'Copy Key')}</span>
            </button>
          </div>

          {/* Endpoint Selector Tabs */}
          <div>
            <span className="text-[11px] font-bold text-[#7A6D6D] uppercase block mb-2">
              {isAr ? 'اختر نقطة النهاية (Endpoint) للتجربة الحية:' : 'Select REST Endpoint to Test:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { path: '/api/v1/entities', label: 'GET /api/v1/entities (Directory & Backing)' },
                { path: '/api/v1/index/qpci', label: 'GET /api/v1/index/qpci (Quarterly Index)' },
                { path: '/api/v1/deals', label: 'GET /api/v1/deals (Marketplace Deals)' }
              ].map(ep => (
                <button
                  key={ep.path}
                  onClick={() => setSelectedEndpoint(ep.path as any)}
                  className={`px-3 py-2 rounded-lg font-mono font-bold transition-all ${
                    selectedEndpoint === ep.path
                      ? 'bg-[#8A1538] text-white'
                      : 'bg-white border border-[#E8DFC8] text-[#1E1919] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {ep.label}
                </button>
              ))}
            </div>
          </div>

          {/* cURL Example */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#6B5E5E] uppercase tracking-wider">{isAr ? 'أمر cURL التنفيذي:' : 'cURL Request Syntax:'}</span>
            </div>
            <pre className="p-3 rounded-xl bg-[#1E1919] text-[#C5A059] font-mono text-[11px] overflow-x-auto border border-[#332B2B]">
              {curlCommand}
            </pre>
          </div>

          {/* Live Response Box */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6B5E5E] uppercase tracking-wider">{isAr ? 'استجابة JSON الحية (200 OK):' : 'Live JSON Payload (HTTP 200 OK):'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <button
                onClick={handleCopyJson}
                className="text-[#8A1538] hover:underline font-bold flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isAr ? 'تم النسخ' : 'Copied JSON') : (isAr ? 'نسخ الرد' : 'Copy JSON')}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#1E1919] text-[#E2E8F0] font-mono text-[11px] overflow-x-auto max-h-72 border border-[#332B2B]">
              {jsonString}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFC8] flex items-center justify-between">
          <span className="text-xs text-[#7A6D6D]">
            Rate limit: 10,000 queries/day for verified partners
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#8A1538] text-white text-xs font-bold rounded-xl"
          >
            {isAr ? 'إغلاق' : 'Close API Console'}
          </button>
        </div>

      </div>
    </div>
  );
};
