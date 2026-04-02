import React, { useMemo, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { videosApi, type VideoItem } from "@/api/videos";
import { useTranslation } from "react-i18next";
import { Play, UploadCloud, Trash2, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {t} from "i18next";

export default function Videos() {
    const { t } = useTranslation();
    const qc = useQueryClient();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

    // чтобы не копить objectURL в памяти
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const { data: videos = [], isLoading } = useQuery({
        queryKey: ["videos"],
        queryFn: videosApi.listVideos,
    });

    const upload = useMutation({
        mutationFn: async () => {
            if (!file) throw new Error(t("pages.videos.errors.noFile", "Choose a video file"));
            if (!title.trim()) throw new Error(t("pages.videos.errors.noTitle", "Title is required"));
            return videosApi.uploadVideo({ title, description, file });
        },
        onSuccess: () => {
            setTitle("");
            setDescription("");
            setFile(null);
            qc.invalidateQueries({ queryKey: ["videos"] });
        },
    });

    const remove = useMutation({
        mutationFn: (id: string) => videosApi.deleteVideo(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
    });

    return (
        <div className="min-h-screen bg-white/50 backdrop-blur-sm relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-r from-rose-200/40 to-pink-200/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-r from-emerald-200/40 to-green-200/40 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-10 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full px-5 py-2 mb-5">
                        <Video className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">
              {t("pages.videos.badge", "Tutorial Library")}
            </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              {t("pages.videos.title", "Video Tutorials")}
            </span>
                    </h1>

                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t(
                            "videos.subtitle",
                            "Upload tutorial videos and keep your learning materials in one place."
                        )}
                    </p>
                </div>

                {/* Upload section */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-lg p-6 md:p-8 mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        <UploadCloud className="w-5 h-5 text-emerald-600" />
                        <div className="text-lg font-semibold text-gray-900">
                            {t("pages.videos.form.header", "Upload a tutorial")}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {t("pages.videos.form.title", "Title")}
                                </label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder={t("pages.videos.form.titlePlaceholder", "e.g. Perfect manicure basics")}
                                    className="rounded-2xl"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {t("pages.videos.form.file", "Video file")}
                                </label>

                                {/* file input лучше обычный, он красивее контролируется */}
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                    className="
                    w-full text-sm text-gray-700
                    file:mr-3 file:rounded-full file:border-0
                    file:bg-gradient-to-r file:from-emerald-600 file:to-green-600
                    file:text-white file:px-4 file:py-2
                    file:cursor-pointer file:hover:from-emerald-700 file:hover:to-green-700
                  "
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    {t("pages.videos.form.hint", "Tip: mp4/webm works best in browsers.")}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {t("pages.videos.form.description", "Description (optional)")}
                                </label>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="rounded-2xl"
                                    placeholder={t("pages.videos.form.descriptionPlaceholder", "Short summary of the tutorial...")}
                                />
                            </div>

                            {upload.isError && (
                                <div className="text-sm text-red-600">
                                    {(upload.error as any)?.message || t("pages.videos.errors.generic", "Upload error")}
                                </div>
                            )}

                            <Button
                                onClick={() => upload.mutate()}
                                disabled={upload.isPending}
                                className="rounded-full px-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                            >
                                {upload.isPending ? t("pages.videos.form.uploading", "Uploading...") : t("pages.videos.form.upload", "Upload")}
                            </Button>
                        </div>

                        {/* Preview */}
                        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-5 border border-emerald-100">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-semibold text-gray-800">{t("pages.videos.preview.title", "Preview")}</div>

                                <span className="text-xs px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 font-medium">
                  {file ? `${Math.max(1, Math.round(file.size / 1024 / 1024))} MB` : t("pages.videos.preview.noFile", "No file")}
                </span>
                            </div>

                            {file && previewUrl ? (
                                <div className="rounded-2xl overflow-hidden shadow-sm border border-emerald-100 bg-white">
                                    <video className="w-full" controls preload="metadata" src={previewUrl} />
                                </div>
                            ) : (
                                <div className="h-52 rounded-2xl border border-dashed border-emerald-200 bg-white flex flex-col items-center justify-center text-gray-500">
                                    <Play className="w-10 h-10 text-emerald-400 mb-2" />
                                    <div className="text-sm text-center px-6">
                                        {t("pages.videos.preview.text", "Choose a video to see a preview here")}
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 text-xs text-gray-500 leading-relaxed">
                                {t(
                                    "videos.preview.note",
                                    "Mock mode: videos are previewed via temporary browser URL. After refresh, only metadata remains."
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* List header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{t("pages.videos.list.title", "All videos")}</h2>
                    <span className="text-sm px-3 py-1 rounded-full bg-black/5 text-gray-700">
            {videos.length} {t("pages.videos.list.count", "items")}
          </span>
                </div>

                {/* List */}
                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                                <div className="h-44 bg-gray-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-16 text-gray-600">
                        {t("pages.videos.list.empty", "No videos yet. Upload your first tutorial!")}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((v) => (
                            <VideoCard
                                key={v.id}
                                v={v}
                                onDelete={() => remove.mutate(v.id)}
                                deleting={remove.isPending}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function VideoCard({
                       v,
                       onDelete,
                       deleting,
                   }: {
    v: VideoItem;
    onDelete: () => void;
    deleting: boolean;
}) {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="relative">
                {v.url ? (
                    <video className="w-full h-48 object-cover" controls preload="metadata" src={v.url} />
                ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                        <Play className="w-10 h-10 text-emerald-500" />
                    </div>
                )}

                <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            {t("pages.videos.card.badge", "Tutorial")}
          </span>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="font-bold text-gray-900 line-clamp-2">{v.title}</div>
                        {v.description ? (
                            <div className="text-sm text-gray-600 mt-2 line-clamp-2">{v.description}</div>
                        ) : (
                            <div className="text-sm text-gray-500 mt-2 italic">{t("pages.videos.card.noDescription", "No description")}</div>
                        )}
                        <div className="text-xs text-gray-400 mt-3">{new Date(v.createdAt).toLocaleString()}</div>
                    </div>

                    <button
                        onClick={onDelete}
                        disabled={deleting}
                        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-50"
                        title={t("pages.videos.card.delete", "Delete")}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
