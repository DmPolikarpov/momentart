export type VideoItem = {
    id: string;
    title: string;
    description?: string;
    // Для моков: local object URL (живет пока вкладка открыта)
    // Для сервера позже: будет нормальный https URL
    url: string;
    createdAt: string;
};

export type UploadVideoInput = {
    title: string;
    description?: string;
    file: File;
};

const LS_KEY = "mock_videos_v1";

function read(): Omit<VideoItem, "url">[] {
    try {
        return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch {
        return [];
    }
}

function makeId() {
    // modern browsers
    // @ts-ignore
    if (typeof crypto !== "undefined" && crypto?.randomUUID) {
        // @ts-ignore
        return crypto.randomUUID();
    }
    // fallback (для моков достаточно)
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}


function write(items: Omit<VideoItem, "url">[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
}

/**
 * Мок-хранилище:
 * - метаданные храним в localStorage
 * - сам файл не храним (для этого нужен IndexedDB/FileSystem API)
 * - для воспроизведения создаём object URL (работает пока страница не перезагружена)
 */
const objectUrlMap = new Map<string, string>();

function getObjectUrl(id: string, file: File) {
    const existing = objectUrlMap.get(id);
    if (existing) return existing;
    const url = URL.createObjectURL(file);
    objectUrlMap.set(id, url);
    return url;
}

export const videosApi = {
    async listVideos(): Promise<VideoItem[]> {
        // Возвращаем мета + url если уже есть (иначе пустая строка)
        const meta = read();
        return meta
            .slice()
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((v) => ({
                ...v,
                url: objectUrlMap.get(v.id) || "",
            })) as VideoItem[];
    },

    async uploadVideo(input: UploadVideoInput): Promise<VideoItem> {
        const id = makeId();
        const createdAt = new Date().toISOString();

        // Сохраняем метаданные
        const meta = read();
        const record = {
            id,
            title: input.title.trim(),
            description: input.description?.trim() || "",
            createdAt,
        };
        write([record, ...meta]);

        // Создаём object URL для текущей сессии
        const url = getObjectUrl(id, input.file);

        // имитация задержки сети
        await new Promise((r) => setTimeout(r, 400));

        return { ...record, url };
    },

    async deleteVideo(id: string): Promise<void> {
        const meta = read().filter((v) => v.id !== id);
        write(meta);

        const url = objectUrlMap.get(id);
        if (url) URL.revokeObjectURL(url);
        objectUrlMap.delete(id);

        await new Promise((r) => setTimeout(r, 200));
    },
};

