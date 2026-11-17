"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Trash2,
  Mail,
  MailOpen,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Reply,
  User,
} from "lucide-react";
import { Message } from "@/lib/types";

export default function AdminMessagesManagement() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
        if (data.messages.length > 0 && !activeMessage) {
          setActiveMessage(data.messages[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (msg: Message) => {
    const nextState = !msg.is_read;
    try {
      await fetch(`/api/messages/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: nextState }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: nextState } : m))
      );
      if (activeMessage?.id === msg.id) {
        setActiveMessage({ ...activeMessage, is_read: nextState });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pesan ini secara permanen?")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (activeMessage?.id === id) {
          setActiveMessage(null);
        }
        setStatus({ type: "success", message: "Pesan berhasil dihapus." });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectMessage = (msg: Message) => {
    setActiveMessage(msg);
    if (!msg.is_read) {
      toggleRead(msg);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-rose-400" />
            <span>Kotak Pesan Masuk (Inbox)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pesan dan permohonan kolaborasi yang dikirim pengunjung melalui formulir kontak.
          </p>
        </div>
      </div>

      {status.type && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-medium animate-in fade-in ${
            status.type === "success"
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}

      {/* Two Column Inbox Layout */}
      {messages.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl">
          <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">Belum Ada Pesan Masuk</p>
          <p className="text-xs text-slate-500 mt-1">
            Setiap pesan yang dikirim melalui formulir kontak publik akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Messages List (Left Column) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
            {messages.map((msg) => {
              const isSelected = activeMessage?.id === msg.id;

              return (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-800 border-emerald-500/60 shadow-lg"
                      : !msg.is_read
                      ? "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15"
                      : "bg-slate-900/60 border-slate-800 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="font-semibold text-slate-200 truncate max-w-[180px]">
                      {msg.name}
                    </span>
                    <span>{new Date(msg.created_at).toLocaleDateString("id-ID")}</span>
                  </div>

                  <p className="text-xs font-bold text-white truncate">{msg.subject}</p>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{msg.message}</p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        !msg.is_read
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "text-slate-500"
                      }`}
                    >
                      {!msg.is_read ? "Belum Dibaca" : "Sudah Dibaca"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Message Reading Pane (Right Column) */}
          <div className="lg:col-span-7">
            {activeMessage ? (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                
                {/* Message Header */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{new Date(activeMessage.created_at).toLocaleString("id-ID")}</span>
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {activeMessage.subject}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(activeMessage)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                      title={activeMessage.is_read ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                    >
                      {activeMessage.is_read ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <MailOpen className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(activeMessage.id)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>{activeMessage.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <a
                      href={`mailto:${activeMessage.email}`}
                      className="text-emerald-400 hover:underline"
                    >
                      {activeMessage.email}
                    </a>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Isi Pesan:
                  </p>
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {activeMessage.message}
                  </div>
                </div>

                {/* Reply Action */}
                <div className="pt-2">
                  <a
                    href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(
                      activeMessage.subject
                    )}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Balas Pesan via Email Langsung</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="glass-panel p-12 text-center rounded-3xl">
                <p className="text-xs text-slate-500">Pilih pesan di samping untuk membaca detail.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
