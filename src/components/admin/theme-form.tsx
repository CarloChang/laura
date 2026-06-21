"use client";

import { useMemo, useState, useTransition } from "react";
import { saveThemeSettings } from "@/app/admin/actions";
import {
  COLOR_TOKENS,
  FONT_ROLES,
  TEXT_FIELDS,
  ELEMENT_COLORS,
  defaultFor,
  type ColorToken,
  type ThemeSettings,
} from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

/** Element color override keyed by the text field it belongs to. */
const ELEMENT_COLOR_BY_TEXT = new Map(
  ELEMENT_COLORS.map((e) => [e.textKey, e] as const),
);

/** Builds the full value map from saved settings, falling back to defaults. */
function withDefaults(settings: ThemeSettings): ThemeSettings {
  const out: ThemeSettings = {};
  for (const t of COLOR_TOKENS) out[t.key] = settings[t.key] ?? t.default;
  for (const f of FONT_ROLES) out[f.key] = settings[f.key] ?? String(f.default);
  for (const t of TEXT_FIELDS) out[t.key] = settings[t.key] ?? t.default;
  for (const e of ELEMENT_COLORS) out[e.key] = settings[e.key] ?? defaultFor(e.key);
  return out;
}

export function ThemeForm({ settings }: { settings: ThemeSettings }) {
  const initial = useMemo(() => withDefaults(settings), [settings]);
  const [values, setValues] = useState<ThemeSettings>(initial);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, startSaving] = useTransition();

  const dirty = useMemo(
    () => Object.keys(values).some((k) => values[k] !== initial[k]),
    [values, initial],
  );

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function resetAll() {
    const defaults: ThemeSettings = {};
    for (const k of Object.keys(values)) defaults[k] = defaultFor(k);
    setValues(defaults);
  }

  function save() {
    setError(null);
    startSaving(async () => {
      try {
        await saveThemeSettings(values);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  const core = COLOR_TOKENS.filter((t) => t.group === "Core");
  const brand = COLOR_TOKENS.filter((t) => t.group === "Brand");
  const card = COLOR_TOKENS.filter((t) => t.group === "Card");

  return (
    <div className="space-y-6 pb-4">
      {/* ── Site text ─────────────────────────────────────────────────── */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-5">
        <div>
          <h2 className="font-condensed text-xl uppercase">Site text</h2>
          <p className="text-xs text-muted-foreground">
            The headline copy on your storefront. Product names and prices are
            edited under <span className="font-medium">Products</span>.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {TEXT_FIELDS.map((f) => {
            const ec = ELEMENT_COLOR_BY_TEXT.get(f.key);
            return (
              <div
                key={f.key}
                className={cn("space-y-1.5", f.multiline && "sm:col-span-2")}
              >
                <Label htmlFor={`txt-${f.key}`}>{f.label}</Label>
                {f.multiline ? (
                  <textarea
                    id={`txt-${f.key}`}
                    rows={3}
                    value={values[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                ) : (
                  <input
                    id={`txt-${f.key}`}
                    type="text"
                    value={values[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                )}
                <p className="text-xs text-muted-foreground">{f.desc}</p>
                {ec && (
                  <MiniColor
                    value={values[ec.key]}
                    isDefault={
                      values[ec.key].toLowerCase() ===
                      defaultFor(ec.key).toLowerCase()
                    }
                    onChange={(v) => set(ec.key, v)}
                    onReset={() => set(ec.key, defaultFor(ec.key))}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Colors ────────────────────────────────────────────────────── */}
      <ColorSection title="Core colors" tokens={core} values={values} set={set} />
      <ColorSection title="Brand accents" tokens={brand} values={values} set={set} />
      <ColorSection title="Product card popup" tokens={card} values={values} set={set} />

      {/* ── Text sizes ────────────────────────────────────────────────── */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-5">
        <div>
          <h2 className="font-condensed text-xl uppercase">Text sizes</h2>
          <p className="text-xs text-muted-foreground">
            Scale each kind of text. 100% is the original size.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {FONT_ROLES.map((role) => {
            const num = Number(values[role.key]);
            return (
              <div key={role.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{role.label}</Label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {Math.round(num * 100)}%
                  </span>
                </div>
                <div className="flex min-h-12 items-center overflow-hidden rounded-md border border-border bg-background px-3 py-1">
                  <span
                    className={cn("truncate leading-tight", role.fontClass)}
                    style={{ fontSize: `calc(1.4rem * ${num})` }}
                  >
                    {role.sample}
                  </span>
                </div>
                <input
                  type="range"
                  min={role.min}
                  max={role.max}
                  step={role.step}
                  value={num}
                  onChange={(e) => set(role.key, e.target.value)}
                  className="w-full accent-terracotta"
                />
                <p className="text-xs text-muted-foreground">{role.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-background/90 py-3 backdrop-blur">
        <Button onClick={save} disabled={!dirty || saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
        <Button variant="ghost" onClick={resetAll} disabled={saving} type="button">
          Reset to defaults
        </Button>
        {saved && <span className="text-sm text-olive">Saved ✓</span>}
        {dirty && !saving && (
          <span className="text-sm text-muted-foreground">Unsaved changes</span>
        )}
      </div>
    </div>
  );
}

function ColorSection({
  title,
  tokens,
  values,
  set,
}: {
  title: string;
  tokens: ColorToken[];
  values: ThemeSettings;
  set: (key: string, value: string) => void;
}) {
  return (
    <section className="space-y-4 rounded-lg border border-border bg-card p-5">
      <h2 className="font-condensed text-xl uppercase">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {tokens.map((t) => (
          <ColorRow
            key={t.key}
            label={t.label}
            desc={t.desc}
            value={values[t.key]}
            onChange={(v) => set(t.key, v)}
          />
        ))}
      </div>
    </section>
  );
}

function ColorRow({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const valid = HEX_RE.test(value);
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} color picker`}
          value={valid ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 shrink-0 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
        />
        <input
          type="text"
          value={value}
          aria-invalid={!valid}
          spellCheck={false}
          onChange={(e) => {
            let v = e.target.value.trim();
            if (v && !v.startsWith("#")) v = `#${v}`;
            onChange(v);
          }}
          className={cn(
            "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 font-mono text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            !valid && "border-destructive ring-3 ring-destructive/20",
          )}
        />
      </div>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

/** Compact "Text color" control shown under a Site-text field. */
function MiniColor({
  value,
  isDefault,
  onChange,
  onReset,
}: {
  value: string;
  isDefault: boolean;
  onChange: (v: string) => void;
  onReset: () => void;
}) {
  const valid = HEX_RE.test(value);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Color</span>
      <input
        type="color"
        aria-label="Text color"
        value={valid ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 w-7 shrink-0 cursor-pointer rounded border border-input bg-transparent p-0.5"
      />
      <input
        type="text"
        value={value}
        aria-invalid={!valid}
        spellCheck={false}
        onChange={(e) => {
          let v = e.target.value.trim();
          if (v && !v.startsWith("#")) v = `#${v}`;
          onChange(v);
        }}
        className={cn(
          "h-6 w-24 min-w-0 rounded border border-input bg-transparent px-1.5 font-mono text-xs outline-none focus-visible:border-ring",
          !valid && "border-destructive",
        )}
      />
      {isDefault ? (
        <span className="text-xs text-muted-foreground/70">inherits</span>
      ) : (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-terracotta hover:underline"
        >
          reset
        </button>
      )}
    </div>
  );
}
