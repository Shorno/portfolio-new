"use client";

import { useState } from "react";
import { Rule } from "@/components/primitives/rule";
import {
  createJobApplication,
  updateJobApplicationStatus,
  updateJobApplicationNotes,
  deleteJobApplication,
} from "@/app/operator/actions";
import {
  ExternalLink,
  Plus,
  Search,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2,
} from "lucide-react";

type JobApplication = {
  id: string;
  company: string;
  role: string;
  status: "wishlist" | "applied" | "interviewing" | "offered" | "rejected" | "ghosted";
  notes: string | null;
  url: string | null;
  appliedAt: Date;
  updatedAt: Date;
};

type DashboardProps = {
  initialApplications: JobApplication[];
};

export function Dashboard({ initialApplications }: DashboardProps) {
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<JobApplication["status"]>("wishlist");
  const [notes, setNotes] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Editing state for notes
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteValue, setEditingNoteValue] = useState("");
  const [noteLoadingId, setNoteLoadingId] = useState<string | null>(null);

  // Status updating state
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);

  // Delete safety state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const newApp = await createJobApplication({
        company,
        role,
        url: url.trim() ? url : undefined,
        status,
        notes: notes.trim() ? notes : undefined,
      });

      // Typecast return value to ensure compatibility
      const castedApp: JobApplication = {
        ...newApp,
        appliedAt: new Date(newApp.appliedAt),
        updatedAt: new Date(newApp.updatedAt),
      };

      setApplications([castedApp, ...applications]);
      setCompany("");
      setRole("");
      setUrl("");
      setStatus("wishlist");
      setNotes("");
      setIsAdding(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to create application.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: JobApplication["status"]) => {
    setStatusLoadingId(id);
    try {
      const updated = await updateJobApplicationStatus(id, newStatus);
      setApplications(
        applications.map((app) =>
          app.id === id
            ? { ...app, status: updated.status, updatedAt: new Date(updated.updatedAt) }
            : app
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setStatusLoadingId(null);
    }
  };

  const startEditingNote = (id: string, currentNotes: string | null) => {
    setEditingNoteId(id);
    setEditingNoteValue(currentNotes || "");
  };

  const handleSaveNote = async (id: string) => {
    setNoteLoadingId(id);
    try {
      const updated = await updateJobApplicationNotes(id, editingNoteValue);
      setApplications(
        applications.map((app) =>
          app.id === id
            ? { ...app, notes: updated.notes, updatedAt: new Date(updated.updatedAt) }
            : app
        )
      );
      setEditingNoteId(null);
    } catch (err) {
      console.error("Failed to save notes", err);
    } finally {
      setNoteLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      return;
    }

    setDeleteLoadingId(id);
    try {
      await deleteJobApplication(id);
      setApplications(applications.filter((app) => app.id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete application", err);
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${d.getDate().toString().padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Metrics Calculation
  const stats = {
    total: applications.length,
    wishlist: applications.filter((a) => a.status === "wishlist").length,
    applied: applications.filter((a) => a.status === "applied").length,
    interviewing: applications.filter((a) => a.status === "interviewing").length,
    offered: applications.filter((a) => a.status === "offered").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    ghosted: applications.filter((a) => a.status === "ghosted").length,
  };

  // Filter and Search logic
  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusStyle = (status: JobApplication["status"]) => {
    switch (status) {
      case "wishlist":
        return "border-accent/40 text-accent bg-accent-soft";
      case "applied":
        return "border-line text-fg-soft bg-surface/30";
      case "interviewing":
        return "border-signal-warn/50 text-signal-warn bg-signal-warn/5";
      case "offered":
        return "border-signal-ok/50 text-signal-ok bg-signal-ok/5";
      case "rejected":
        return "border-line text-faint bg-surface/10";
      case "ghosted":
        return "border-line text-muted bg-surface/10";
    }
  };

  return (
    <div className="space-y-10 py-10">
      {/* Editorial Headline */}
      <div>
        <span className="mono-label text-accent">OPERATOR PORTAL // RECORDING INTERFACE</span>
        <h1 className="mt-2 font-display text-4xl text-fg md:text-6xl">
          Job Application{" "}
          <span className="font-display-italic text-accent">manual</span>
        </h1>
      </div>

      {/* Metrics Spec Sheet */}
      <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-7">
        <div className="bg-bg p-4 text-center">
          <span className="mono-label block text-[10px]">TOTAL SCHED</span>
          <span className="font-mono text-2xl font-semibold text-fg">{stats.total}</span>
        </div>
        <div className="bg-bg p-4 text-center">
          <span className="mono-label block text-[10px] text-accent">WISHLIST</span>
          <span className="font-mono text-2xl font-semibold text-accent">{stats.wishlist}</span>
        </div>
        <div className="bg-bg p-4 text-center">
          <span className="mono-label block text-[10px] text-fg-soft">APPLIED</span>
          <span className="font-mono text-2xl font-semibold text-fg-soft">{stats.applied}</span>
        </div>
        <div className="bg-bg p-4 text-center">
          <span className="mono-label block text-[10px] text-signal-warn">ACTIVE INT</span>
          <span className="font-mono text-2xl font-semibold text-signal-warn">{stats.interviewing}</span>
        </div>
        <div className="bg-bg p-4 text-center">
          <span className="mono-label block text-[10px] text-signal-ok">OFFERED</span>
          <span className="font-mono text-2xl font-semibold text-signal-ok">{stats.offered}</span>
        </div>
        <div className="bg-bg p-4 text-center">
          <span className="mono-label block text-[10px] text-faint">REJECTED</span>
          <span className="font-mono text-2xl font-semibold text-muted">{stats.rejected}</span>
        </div>
        <div className="bg-bg p-4 text-center">
          <span className="mono-label block text-[10px] text-muted">GHOSTED</span>
          <span className="font-mono text-2xl font-semibold text-muted">{stats.ghosted}</span>
        </div>
      </div>

      {/* Toolbar / Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by company or role..."
            className="w-full border border-line bg-bg pl-10 pr-4 py-2 font-mono text-xs text-fg outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Add Record Toggle */}
        <button
          onClick={() => {
            setIsAdding(true);
            setFormError(null);
          }}
          className="flex items-center justify-center gap-1.5 border border-line bg-bg-elev px-4 py-2 font-mono text-xs tracking-mono-wide text-fg uppercase hover:border-accent hover:text-accent transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          ADD SPEC RECORD
        </button>
      </div>

      {/* Modal Application Form */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsAdding(false)}
            className="absolute inset-0 bg-bg/85 backdrop-blur-[2px] transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg border border-line bg-bg p-6 md:p-8 shadow-2xl z-10 animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-4 right-4 text-muted hover:text-accent font-mono text-[10px] uppercase cursor-pointer"
            >
              [ Close ]
            </button>

            <div className="mb-6">
              <span className="mono-label text-accent">DATA ENTRY // NEW RECORD</span>
              <h3 className="mt-2 font-display text-3xl text-fg">
                New Application{" "}
                <span className="font-display-italic text-accent">spec</span>
              </h3>
              <Rule variant="ticked" className="mt-4" />
            </div>

            {formError && (
              <div className="mb-4 border border-accent/20 bg-accent-soft px-4 py-3 text-xs text-accent font-mono">
                [ERROR] {formError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="mono-label block mb-1.5">Company Name *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Stripe"
                  className="w-full border border-line bg-bg-elev px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="mono-label block mb-1.5">Role / Position *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Junior Frontend Developer"
                  className="w-full border border-line bg-bg-elev px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="mono-label block mb-1.5">Job Board / Spec URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://company.com/careers/..."
                  className="w-full border border-line bg-bg-elev px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="mono-label block mb-1.5">Application Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as JobApplication["status"])}
                  className="w-full border border-line bg-bg-elev px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option value="wishlist" className="bg-bg text-fg">WISHLIST / TODO</option>
                  <option value="applied" className="bg-bg text-fg">APPLIED</option>
                  <option value="interviewing" className="bg-bg text-fg">INTERVIEWING</option>
                  <option value="offered" className="bg-bg text-fg">OFFERED</option>
                  <option value="rejected" className="bg-bg text-fg">REJECTED</option>
                  <option value="ghosted" className="bg-bg text-fg">GHOSTED</option>
                </select>
              </div>
              <div>
                <label className="mono-label block mb-1.5">Brief Notes / Context</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Met hiring manager at meetup, using cold email referral..."
                  rows={3}
                  className="w-full border border-line bg-bg-elev px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent resize-y transition-colors"
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-line font-mono text-xs text-muted hover:text-fg hover:border-fg uppercase transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-accent text-accent-fg px-6 py-2.5 font-mono text-xs tracking-mono-wide uppercase hover:bg-accent/90 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {formLoading ? "SAVING..." : "SAVE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="border-b border-line flex flex-wrap gap-1 sm:gap-2">
        {["all", "wishlist", "applied", "interviewing", "offered", "rejected", "ghosted"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-wide border-t border-x -mb-px transition-colors cursor-pointer ${
              filterStatus === s
                ? "border-line border-b-bg bg-bg text-accent font-semibold"
                : "border-transparent bg-transparent text-muted hover:text-fg"
            }`}
          >
            {s === "wishlist" ? "wishlist / todo" : s}
          </button>
        ))}
      </div>

      {/* Job Records List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="border border-dashed border-line p-12 text-center text-muted font-mono text-xs">
            [NO RECORDS DISCOVERED MATCHING CURRENT SPEC]
          </div>
        ) : (
          filteredApplications.map((app) => (
            <div
              key={app.id}
              className="border border-line bg-bg p-5 md:p-6 transition-all hover:bg-bg-elev/40 relative"
            >
              {/* Row Grid */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Meta details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2.5">
                    <span className="font-mono text-[10px] text-muted">
                      {formatDate(app.appliedAt)}
                    </span>
                    <span className="text-faint font-mono text-[10px]">•</span>
                    {app.url ? (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-1 font-mono text-[10px] text-muted hover:text-accent"
                      >
                        SPEC SHEET
                        <ExternalLink className="h-3 w-3 text-faint group-hover:text-accent transition-colors" />
                      </a>
                    ) : (
                      <span className="font-mono text-[10px] text-faint">NO URL</span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl text-fg truncate">
                    {app.company}
                  </h3>
                  <p className="font-mono text-xs text-fg-soft">
                    {app.role}
                  </p>
                </div>

                {/* Status indicator and actions */}
                <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-end">
                  {/* Status Dropdown/Selector */}
                  <div className="relative">
                    {statusLoadingId === app.id ? (
                      <div className="flex items-center gap-1.5 border border-line px-2.5 py-1 font-mono text-[10px]">
                        <Loader2 className="h-3 w-3 animate-spin text-accent" />
                        SAVING
                      </div>
                    ) : (
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as JobApplication["status"])}
                        className={`border font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-sm outline-none cursor-pointer transition-colors ${getStatusStyle(
                          app.status
                        )}`}
                      >
                        <option value="wishlist" className="bg-bg text-fg">WISHLIST</option>
                        <option value="applied" className="bg-bg text-fg">APPLIED</option>
                        <option value="interviewing" className="bg-bg text-fg">INTERVIEWING</option>
                        <option value="offered" className="bg-bg text-fg">OFFERED</option>
                        <option value="rejected" className="bg-bg text-fg">REJECTED</option>
                        <option value="ghosted" className="bg-bg text-fg">GHOSTED</option>
                      </select>
                    )}
                  </div>

                  {/* Record actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        editingNoteId === app.id
                          ? setEditingNoteId(null)
                          : startEditingNote(app.id, app.notes)
                      }
                      className="p-1 border border-line hover:border-accent hover:text-accent text-muted transition-colors rounded-sm cursor-pointer"
                      title="Edit Note"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      disabled={deleteLoadingId === app.id}
                      className={`px-2 py-0.5 border font-mono text-[10px] tracking-wide rounded-sm transition-colors cursor-pointer ${
                        deleteConfirmId === app.id
                          ? "border-accent text-accent bg-accent-soft"
                          : "border-line text-muted hover:border-accent hover:text-accent"
                      }`}
                    >
                      {deleteLoadingId === app.id ? (
                        <Loader2 className="h-3 w-3 animate-spin mx-1" />
                      ) : deleteConfirmId === app.id ? (
                        "CONFIRM?"
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </button>
                    {deleteConfirmId === app.id && (
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-0.5 border border-line hover:border-fg text-muted hover:text-fg rounded-sm cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes block */}
              <div className="mt-4 pt-3.5 border-t border-line/60">
                <span className="mono-label block text-[9px] mb-1 text-faint">MEMORANDUM // NOTES</span>
                {editingNoteId === app.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editingNoteValue}
                      onChange={(e) => setEditingNoteValue(e.target.value)}
                      placeholder="Add simple context or update progress..."
                      className="w-full border border-line bg-bg p-2 font-mono text-xs text-fg outline-none focus:border-accent resize-y"
                      rows={2}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="flex items-center gap-1 px-2.5 py-1 border border-line font-mono text-[10px] text-muted hover:text-fg cursor-pointer"
                      >
                        <X className="h-3 w-3" /> CANCEL
                      </button>
                      <button
                        onClick={() => handleSaveNote(app.id)}
                        disabled={noteLoadingId === app.id}
                        className="flex items-center gap-1 px-2.5 py-1 bg-accent text-accent-fg font-mono text-[10px] hover:bg-accent/90 disabled:opacity-50 cursor-pointer"
                      >
                        {noteLoadingId === app.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Check className="h-3 w-3" />
                        )}
                        SAVE NOTE
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-mono text-xs text-fg-soft whitespace-pre-wrap">
                    {app.notes ? app.notes : <span className="italic text-faint">[NO NOTES RECORDED]</span>}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
