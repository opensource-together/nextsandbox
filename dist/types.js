"use strict";
/**
 * Définitions de types pour NextSandbox
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandboxEventType = void 0;
/**
 * Types d'événements possibles dans la sandbox
 */
var SandboxEventType;
(function (SandboxEventType) {
    SandboxEventType["COMPONENT_SELECT"] = "component-select";
    SandboxEventType["SEARCH"] = "search";
    SandboxEventType["FILTER_CATEGORY"] = "filter-category";
    SandboxEventType["THEME_CHANGE"] = "theme-change";
    SandboxEventType["VIEW_MODE_CHANGE"] = "view-mode-change";
})(SandboxEventType || (exports.SandboxEventType = SandboxEventType = {}));
