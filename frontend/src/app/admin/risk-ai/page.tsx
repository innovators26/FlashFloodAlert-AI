"use client";
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/store/useStore";
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";

export default function RiskAndAI() {
  const villages = useStore(state => state.villages);
  const selectedVillageId = useStore(state => state.selectedVillageId);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const village = villages.find(v => v.id === selectedVillageId) || villages[0];

  const tabs = [
    "Current Risk",
    "Risk Factors",
    "AI Explanation",
    "Confidence Score",
    "Prediction Timeline / Lead Time"
  ];

  const getRiskColorClass = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-600';
      case 'MODERATE': return 'text-yellow-500';
      case 'HIGH': return 'text-orange-500';
      case 'CRITICAL': return 'text-red-600';
      default: return 'text-slate-500';
    }
  };

  const getRiskBgClass = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-green-600';
      case 'MODERATE': return 'bg-yellow-500';
      case 'HIGH': return 'bg-orange-500';
      case 'CRITICAL': return 'bg-red-600';
      default: return 'bg-slate-500';
    }
  };

  const getDeterministicScore = (level: string) => {
    switch (level) {
      case 'LOW': return 24;
      case 'MODERATE': return 54;
      case 'HIGH': return 68;
      case 'CRITICAL': return 86;
      default: return 50;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Risk & AI</h1>
        <p className="text-slate-600 font-medium">AI-based flash-flood and landslide risk assessment, explanation and early-warning analysis.</p>
      </div>

      {/* MAIN TAB CONTAINER */}
      <Card className="bg-white shadow-sm border-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row border-b border-slate-200 bg-slate-50 overflow-x-auto hide-scrollbar">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === idx 
                  ? 'border-blue-600 text-blue-700 bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <CardContent className="p-6 md:p-8">
          {/* TAB 1: CURRENT RISK */}
          {activeTab === 0 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Flash Flood */}
                <div className="border rounded-xl p-5 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 mb-4 tracking-tight uppercase text-sm">Flash Flood Risk</h3>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase mb-1">Risk Level</div>
                      <div className={`text-3xl font-black ${getRiskColorClass(village.flashFloodRisk)}`}>{village.flashFloodRisk}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium uppercase mb-1">Risk Score</div>
                      <div className="text-xl font-bold text-slate-700">{getDeterministicScore(village.flashFloodRisk)} / 100</div>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full mb-6 overflow-hidden">
                    <div className={`h-full ${getRiskBgClass(village.flashFloodRisk)} transition-all`} style={{ width: `${getDeterministicScore(village.flashFloodRisk)}%` }}></div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Primary Drivers:</h4>
                    <ul className="text-sm text-slate-700 space-y-1 font-medium pl-4 list-disc marker:text-slate-400">
                      <li>Rainfall</li>
                      <li>Soil Moisture</li>
                      <li>Weather Conditions</li>
                      <li>Terrain / Drainage</li>
                    </ul>
                  </div>
                </div>

                {/* Landslide */}
                <div className="border rounded-xl p-5 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 mb-4 tracking-tight uppercase text-sm">Landslide Risk</h3>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase mb-1">Risk Level</div>
                      <div className={`text-3xl font-black ${getRiskColorClass(village.landslideRisk)}`}>{village.landslideRisk}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium uppercase mb-1">Risk Score</div>
                      <div className="text-xl font-bold text-slate-700">{getDeterministicScore(village.landslideRisk)} / 100</div>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full mb-6 overflow-hidden">
                    <div className={`h-full ${getRiskBgClass(village.landslideRisk)} transition-all`} style={{ width: `${getDeterministicScore(village.landslideRisk)}%` }}></div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Primary Drivers:</h4>
                    <ul className="text-sm text-slate-700 space-y-1 font-medium pl-4 list-disc marker:text-slate-400">
                      <li>Rainfall</li>
                      <li>Soil Moisture</li>
                      <li>Slope</li>
                      <li>Tilt</li>
                      <li>Terrain</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Combined Risk */}
              <div className="border rounded-xl p-6 bg-slate-50">
                <h3 className="font-bold text-slate-800 mb-4 tracking-tight uppercase text-sm">Combined Risk</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
                  <div className="min-w-[150px]">
                    <div className="text-xs text-slate-500 font-medium uppercase mb-1">Risk Level</div>
                    <div className={`text-4xl font-black ${getRiskColorClass(village.combinedRisk)}`}>{village.combinedRisk}</div>
                  </div>
                  <div className="min-w-[150px]">
                    <div className="text-xs text-slate-500 font-medium uppercase mb-1">Risk Score</div>
                    <div className="text-3xl font-bold text-slate-700">{getDeterministicScore(village.combinedRisk)} / 100</div>
                  </div>
                </div>
                <p className="text-slate-700 font-medium max-w-3xl leading-relaxed">
                  Combined flood and landslide conditions indicate elevated potential for cascading impacts in vulnerable areas.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: RISK FACTORS */}
          {activeTab === 1 && (
            <div className="grid md:grid-cols-2 gap-10 animate-in fade-in duration-300">
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 border-b pb-2">Flash Flood Factors</h3>
                <div className="space-y-4 text-sm font-medium">
                  {[
                    { label: 'Rainfall', val: village.flashFloodRisk },
                    { label: 'Soil Moisture', val: village.flashFloodRisk },
                    { label: 'Weather', val: village.flashFloodRisk },
                    { label: 'Terrain / Drainage', val: 'MODERATE' },
                    { label: 'Historical Events', val: 'MODERATE' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                      <span className="text-slate-700">{item.label}</span>
                      <Badge variant="outline" className={`font-bold ${getColorForFactor(item.val)} border-current bg-transparent`}>{item.val}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 border-b pb-2">Landslide Factors</h3>
                <div className="space-y-4 text-sm font-medium">
                  {[
                    { label: 'Rainfall', val: village.landslideRisk },
                    { label: 'Soil Moisture', val: village.landslideRisk },
                    { label: 'Slope', val: village.landslideRisk },
                    { label: 'Tilt', val: 'MODERATE' },
                    { label: 'Terrain / DEM', val: 'MODERATE' },
                    { label: 'Historical Susceptibility', val: 'MODERATE' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                      <span className="text-slate-700">{item.label}</span>
                      <Badge variant="outline" className={`font-bold ${getColorForFactor(item.val)} border-current bg-transparent`}>{item.val}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI EXPLANATION */}
          {activeTab === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800">AI Risk Explanation</h3>
              <p className="text-slate-700 font-medium leading-relaxed max-w-4xl bg-blue-50/50 p-5 rounded-lg border border-blue-100">
                "The current risk assessment is driven by the combined influence of elevated rainfall, high soil moisture, terrain conditions and slope-related factors. These inputs increase the assessed potential for flash-flood and landslide impacts in vulnerable locations."
              </p>
              
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2">Key Contributing Factors</h4>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded border">
                    <div className="font-bold text-slate-800 mb-1">1. Rainfall</div>
                    <div className="text-sm text-slate-600">Elevated rainfall increases runoff and contributes to soil saturation.</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded border">
                    <div className="font-bold text-slate-800 mb-1">2. Soil Moisture</div>
                    <div className="text-sm text-slate-600">High soil moisture indicates increased ground saturation.</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded border">
                    <div className="font-bold text-slate-800 mb-1">3. Terrain / Slope</div>
                    <div className="text-sm text-slate-600">Steep and vulnerable terrain can increase landslide susceptibility.</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded border">
                    <div className="font-bold text-slate-800 mb-1">4. Historical Events</div>
                    <div className="text-sm text-slate-600">Historical disaster information provides additional contextual risk information.</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded border">
                    <div className="font-bold text-slate-800 mb-1">5. IoT Observations</div>
                    <div className="text-sm text-slate-600">Sensor observations provide localized environmental conditions.</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Model Output</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">Flash Flood Model:</div>
                    <div className="font-bold text-slate-800">XGBoost</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Landslide / Model Validation:</div>
                    <div className="font-bold text-slate-800">Random Forest</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Explainability:</div>
                    <div className="font-bold text-slate-800">SHAP</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONFIDENCE SCORE */}
          {activeTab === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl border">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-2">Flash Flood Risk</h4>
                  <div className="text-3xl font-black text-blue-600 mb-4">{Math.min(95, village.confidence + 2)}%</div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${Math.min(95, village.confidence + 2)}%` }}></div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-2">Landslide Risk</h4>
                  <div className="text-3xl font-black text-blue-600 mb-4">{village.confidence}%</div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${village.confidence}%` }}></div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-2">Combined Risk</h4>
                  <div className="text-3xl font-black text-blue-600 mb-4">{Math.min(99, village.confidence + 1)}%</div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${Math.min(99, village.confidence + 1)}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-3">Confidence Inputs</h4>
                <ul className="text-sm text-slate-700 font-medium pl-5 list-disc space-y-1.5 marker:text-blue-400 mb-4">
                  <li>Data availability</li>
                  <li>Sensor observations</li>
                  <li>Weather information</li>
                  <li>Terrain information</li>
                  <li>Historical information</li>
                </ul>
                <p className="text-xs text-slate-500 italic border-t border-blue-200/50 pt-3">
                  "Confidence reflects the availability and consistency of the inputs used in the current risk assessment."
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: PREDICTION TIMELINE / LEAD TIME */}
          {activeTab === 4 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Prediction Timeline / Lead Time</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900 text-white p-6 rounded-xl font-bold text-sm tracking-tight text-center gap-4">
                <div className="flex-1">DATA OBSERVATION</div>
                <div className="text-blue-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1">RISK ASSESSMENT</div>
                <div className="text-blue-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1">HAZARD ANALYSIS</div>
                <div className="text-blue-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1 text-red-400">EARLY WARNING</div>
                <div className="text-blue-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1">AFFECTED AREA IDENTIFICATION</div>
                <div className="text-blue-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1 text-green-400">EVACUATION PREPARATION</div>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center max-w-lg mx-auto">
                <div className="text-sm font-bold text-red-800 uppercase tracking-widest mb-2">Early Warning Window</div>
                <div className="text-4xl font-black text-red-600 mb-3">{village.warningWindow || "12–24 HOURS"}</div>
                <p className="text-sm text-slate-600">
                  "Estimated potential lead-time window for preparedness and emergency response."
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2">Regional Warning Windows</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {villages.map(v => (
                    <div key={v.id} className="bg-slate-50 p-3 rounded border text-center">
                      <div className="text-xs text-slate-500 font-bold mb-1 truncate">{v.name}</div>
                      <div className="text-sm font-black text-slate-800">{v.warningWindow}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* BOTTOM ACTION SECTION */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 sm:mb-0 px-2">Risk Response</div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => router.push('/admin/risk-map')} 
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg transition-colors border"
          >
            View Risk Map
          </button>
          <button 
            onClick={() => router.push('/admin/alerts')} 
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg transition-colors border"
          >
            View Active Alerts
          </button>
          <button 
            onClick={() => router.push('/admin/affected-areas')} 
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg transition-colors border"
          >
            View Affected Areas
          </button>
        </div>
      </div>
    </div>
  );
}

function getColorForFactor(val: string) {
  if (val === 'CRITICAL') return 'text-red-600';
  if (val === 'HIGH') return 'text-orange-500';
  if (val === 'MODERATE') return 'text-yellow-500';
  if (val === 'LOW') return 'text-green-600';
  return 'text-slate-500';
}
