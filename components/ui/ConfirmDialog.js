"use client";

export default function ConfirmDialog({
    open,
    title = "Are you sure?",
    message,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <div
                className="absolute inset-0 bg-ink/40"
                onClick={onCancel}
            />

            <div className="relative bg-white rounded-xl border border-line p-6 max-w-sm w-full shadow-lg">
                <h2 className="font-display text-xl mb-2">{title}</h2>
                <p className="text-sm text-neutral-600 mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="text-sm font-medium px-4 py-2 rounded-lg border border-line hover:bg-stone transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="text-sm font-medium px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}