"use client";

import { useMemo, useState, useTransition } from "react";
import { saveThemeSettings } from "@/app/admin/actions";
import {
  COLOR_TOKENS,
  FONT_ROLES,
  defaultFor,
  type ThemeSettings,
} from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

/** Builds the full value map from saved settings, falling back to defaults. */
function withDefaults(settings: ThemeSettings): ThemeSettings {
  const out: ThemeSettings = {};
  for (const t of COLOR_TOKENS) out[t.key] = settings[t.key] ?? t.default;
  for (const f of FONT_ROLES) out[f.key] = settings[f.key] ?? String(f.default);
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

  return (
    <div className="space-y-6">
      <ColorSection title="Core colors" tokens={core} values={values} set={set} />
      <ColorSection title="Brand accents" tokens={brand} values={values} set={set} />

      <section className="space-y-4 rounded-lg border border-border bg-card p-5">
        <div>
          <h2 className="font-condensed text-xl uppercase">Text sizes</h2>
          <p className="text-xs text-muted-foreground">
            Scale each kind of text. 100% is the original size.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {FONT_ROLES.map((role) => {
            const num = Number(values[role.key]);
            return (
              <div key={role.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label>{role.label}</Label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {Math.round(num * 100)}%
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
  tokens: typeof COLOR_TOKENS;
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
  value,
  onChange,
}: {
  label: string;
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
        <Input
          value={value}
          aria-invalid={!valid}
          spellCheck={false}
          onChange={(e) => {
            let v = e.target.value.trim();
            if (v && !v.startsWith("#")) v = `#${v}`;
            onChange(v);
          }}
          className="font-mono"
        />
      </div>
    </div>
  );
}
