(function (root) {
  function asArray(value) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }

  function tagLabel(tag) {
    if (tag && typeof tag === "object") return String(tag.label || tag.name || tag.id || "").trim();
    return String(tag).trim();
  }

  function tagKey(tag) {
    if (tag && typeof tag === "object" && tag.id) return String(tag.id).trim().toLowerCase();
    return tagLabel(tag).toLowerCase();
  }

  function addTags(output, seen, tags, limit) {
    for (const tag of asArray(tags)) {
      if (output.length >= limit) return;

      const label = tagLabel(tag);
      const key = tagKey(tag);
      if (!label || seen.has(key)) continue;

      output.push(label);
      seen.add(key);
    }
  }

  function getPublicSpaceTags(signals, options) {
    const source = signals || {};
    const limit = options && Number.isFinite(options.limit) ? Math.max(0, options.limit) : 4;
    if (limit === 0) return [];

    const workspaceVibe = asArray(source.workspaceVibe);
    const bestSuitedFor = asArray(source.bestSuitedFor);
    const output = [];
    const seen = new Set();

    addTags(output, seen, workspaceVibe.slice(0, 2), limit);
    addTags(output, seen, bestSuitedFor.slice(0, 1), limit);
    addTags(output, seen, source.energyLevel, limit);
    addTags(output, seen, bestSuitedFor.slice(1), limit);
    addTags(output, seen, source.noiseLevel, limit);
    addTags(output, seen, workspaceVibe.slice(2), limit);

    return output;
  }

  function renderSpaceSignalTags(root, tags) {
    root.replaceChildren();
    root.hidden = tags.length === 0;

    for (const tag of tags) {
      const chip = document.createElement("span");
      chip.className = "space-tag";
      chip.textContent = tag;
      root.append(chip);
    }
  }

  root.VlooSpaceSignals = {
    getPublicSpaceTags,
    renderSpaceSignalTags,
  };
})(typeof window !== "undefined" ? window : globalThis);
