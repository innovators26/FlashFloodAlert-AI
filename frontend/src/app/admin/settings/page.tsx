"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ShieldAlert, Users, Radio, Smartphone, Activity, Check, X } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState('ROLES');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-slate-500">Configure users, risk thresholds, alert behavior, data sources, and communication channels.</p>
        </div>
      </div>

      <div className="flex border-b text-sm overflow-x-auto">
        {['ROLES', 'ALERTS', 'SYSTEM', 'NOTIFICATIONS', 'SECURITY'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {tab === 'ROLES' ? 'User Roles' : tab === 'ALERTS' ? 'Alert Configuration' : tab === 'SYSTEM' ? 'System Configuration' : tab === 'NOTIFICATIONS' ? 'Notification Channels' : 'Security'}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'ROLES' && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-600" /> Role Permissions Matrix</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="grid md:grid-cols-3 gap-6 mb-6 bg-slate-50 p-5 rounded-lg border">
                <div>
                  <h3 className="font-bold text-slate-800 mb-1.5 text-xs tracking-wider">ADMIN</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Full system access, monitoring, configuration and administration.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1.5 text-xs tracking-wider">EMERGENCY AUTHORITY</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Operational access for emergency response, alerts, evacuation and affected-area management.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1.5 text-xs tracking-wider">COMMUNITY USER</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Public access to local risk information, alerts, evacuation guidance, shelters and safer routes.</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-x-auto shadow-sm">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 w-2/5">Permission</th>
                      <th className="px-6 py-4 text-center w-1/5">Admin</th>
                      <th className="px-6 py-4 text-center w-1/5">Emergency Authority</th>
                      <th className="px-6 py-4 text-center w-1/5">Community User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { perm: 'View Dashboard', a: true, e: true, c: true },
                      { perm: 'View Risk Map', a: true, e: true, c: true },
                      { perm: 'View AI Risk Analysis', a: true, e: true, c: false },
                      { perm: 'View Sensors & Data', a: true, e: true, c: false },
                      { perm: 'View Alerts', a: true, e: true, c: true },
                      { perm: 'Acknowledge Alerts', a: true, e: true, c: false },
                      { perm: 'Escalate Alerts', a: true, e: true, c: false },
                      { perm: 'View Affected Areas', a: true, e: true, c: true },
                      { perm: 'Emergency Response', a: true, e: true, c: false },
                      { perm: 'View Field Reports', a: true, e: true, c: false },
                      { perm: 'Review / Manage Field Reports', a: true, e: true, c: false },
                      { perm: 'View Cascade Analysis', a: true, e: true, c: false },
                      { perm: 'View History', a: true, e: true, c: false },
                      { perm: 'Evacuation Guidance', a: true, e: true, c: true },
                      { perm: 'View Shelters & Safer Routes', a: true, e: true, c: true },
                      { perm: 'Model Validation', a: true, e: false, c: false },
                      { perm: 'Settings / Administration', a: true, e: false, c: false }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-3.5 font-medium text-slate-700">{row.perm}</td>
                        <td className="px-6 py-3.5 text-center">
                          {row.a ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {row.e ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {row.c ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'ALERTS' && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-red-600" /> Alert Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 border-b pb-2">Risk Thresholds</h4>
                    <div className="space-y-3 text-sm">
                       <div className="flex justify-between"><span>Flash Flood Risk</span><span className="font-medium text-slate-600">LOW, MODERATE, HIGH, CRITICAL</span></div>
                       <div className="flex justify-between"><span>Landslide Risk</span><span className="font-medium text-slate-600">LOW, MODERATE, HIGH, CRITICAL</span></div>
                       <div className="flex justify-between"><span>Combined Risk</span><span className="font-medium text-slate-600">LOW, MODERATE, HIGH, CRITICAL</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 border-b pb-2">Alert Levels</h4>
                    <div className="space-y-4 text-sm">
                       <div><Badge variant="warning">WATCH</Badge><p className="text-slate-600 mt-1">Risk conditions developing. Action: Continue monitoring.</p></div>
                       <div><Badge variant="high">WARNING</Badge><p className="text-slate-600 mt-1">Significant hazard conditions detected. Action: Prepare emergency response.</p></div>
                       <div><Badge variant="destructive">CRITICAL</Badge><p className="text-slate-600 mt-1">Immediate threat conditions detected. Action: Activate emergency response and evacuation procedures.</p></div>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'NOTIFICATIONS' && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5 text-blue-600" /> Notification Channels</CardTitle></CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                 <div>
                   <h4 className="font-semibold mb-4 text-green-700">ONLINE MODE</h4>
                   <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
                      <div className="flex justify-between items-center"><span>Web Dashboard</span><Badge variant="success">ACTIVE</Badge></div>
                      <div className="flex justify-between items-center"><span>Mobile App Push</span><Badge variant="success">ACTIVE</Badge></div>
                      <div className="flex justify-between items-center"><span>SMS Gateways</span><Badge variant="success">ACTIVE</Badge></div>
                   </div>
                 </div>
                 <div>
                   <h4 className="font-semibold mb-4 text-orange-700">OFFLINE MODE</h4>
                   <div className="space-y-4 border rounded-lg p-4 bg-orange-50/30 border-orange-200">
                      <div className="flex justify-between items-center"><span>LoRa Communication</span><Badge variant="success">ACTIVE</Badge></div>
                      <div className="flex justify-between items-center"><span>Local Siren Network</span><Badge variant="success">READY</Badge></div>
                      <div className="mt-4 pt-4 border-t border-orange-200 text-sm">
                         <p className="font-semibold text-orange-900 mb-1">OFFLINE MODE SIMULATION</p>
                         <p className="text-slate-600">Internet connection unavailable. Local LoRa warning communication remains active.</p>
                         <p className="text-slate-500 mt-2 text-xs font-medium">Last synchronized data: 09:42 AM</p>
                      </div>
                   </div>
                 </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'SYSTEM' && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-blue-600" /> System Configuration</CardTitle></CardHeader>
            <CardContent>
               <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">IoT Network</span>
                   <Badge variant="success">ACTIVE</Badge>
                 </div>
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">LoRa</span>
                   <Badge variant="success">ACTIVE</Badge>
                 </div>
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">Database</span>
                   <Badge variant="success">CONNECTED</Badge>
                 </div>
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">Weather Data</span>
                   <Badge variant="success">LIVE</Badge>
                 </div>
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">GIS Data</span>
                   <Badge variant="success">LIVE</Badge>
                 </div>
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">DEM / Terrain</span>
                   <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">AVAILABLE</Badge>
                 </div>
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">Total Nodes</span>
                   <span className="font-bold">27</span>
                 </div>
                 <div className="flex justify-between border-b pb-2">
                   <span className="font-medium text-slate-700">Last Update</span>
                   <span className="font-bold text-slate-600">09:42 AM</span>
                 </div>
               </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'SECURITY' && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Radio className="h-5 w-5 text-blue-600" /> Security & Session</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 max-w-md bg-slate-50 p-6 rounded-lg border">
                <div className="flex justify-between text-sm border-b pb-2">
                  <span className="text-slate-500">Current User</span>
                  <span className="font-bold text-slate-800">Administrator</span>
                </div>
                <div className="flex justify-between text-sm border-b pb-2">
                  <span className="text-slate-500">Role</span>
                  <Badge>ADMIN</Badge>
                </div>
                <div className="flex justify-between text-sm border-b pb-2">
                  <span className="text-slate-500">Authentication Status</span>
                  <span className="font-semibold text-green-600">Verified</span>
                </div>
                <div className="flex justify-between text-sm border-b pb-2">
                  <span className="text-slate-500">Active Session</span>
                  <span className="font-medium">1 hr 24 mins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Session Timeout</span>
                  <span className="font-medium text-slate-700">8 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}