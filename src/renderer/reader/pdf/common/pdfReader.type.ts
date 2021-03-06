// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END

import { IEventPayload_R2_EVENT_WEBVIEW_KEYDOWN, IEventPayload_R2_EVENT_WEBVIEW_KEYUP } from "@r2-navigator-js/electron/common/events";
import { IEventBus } from "./eventBus";

export type IPdfPlayerScale = "fit" | "width" | "50" | "100" | "150" | "200" | "300" | "500";
export type IPdfPlayerView = "scrolled" | "paginated";
export type IPdfPlayerColumn = "auto" | "1" | "2";

export interface IPdfPlayerEvent {
    "page": (pageNumber: number) => any;
    "scale": (scale: IPdfPlayerScale) => any;
    "view": (view: IPdfPlayerView) => any;
    "column": (column: IPdfPlayerColumn) => any;
    "search": (searchWord: string) => any;
    "search-next": () => any;
    "search-previous": () => any;
    "page-next": () => any;
    "page-previous": () => any;
    "ready": (toc?: TToc) => any;
    "start": (pdfPath: string) => any;
    "copy": (text: string) => any;
    "keydown": (event: IEventPayload_R2_EVENT_WEBVIEW_KEYDOWN) => any;
    "keyup": (event: IEventPayload_R2_EVENT_WEBVIEW_KEYUP) => any;
}

export interface IEventBusPdfPlayer extends IEventBus {

    subscribe: <TKey extends keyof IPdfPlayerEvent, TFn extends IPdfPlayerEvent[TKey]>(key: TKey, fn: TFn) => void;
    dispatch: <TKey extends keyof IPdfPlayerEvent>(key: TKey, ...arg: Parameters<IPdfPlayerEvent[TKey]>) => void;
    remove: <TKey extends keyof IPdfPlayerEvent>(fn: IPdfPlayerEvent[TKey], key?: TKey) => void;
    removeKey: <TKey extends keyof IPdfPlayerEvent>(key: TKey) => void;
}

// extract from publication link class
// import { Link } from "@r2-shared-js/models/publication-link";
export interface ILink {
    Href?: string;
    Title?: string;
    Children?: ILink[];
}

export type TToc = ILink[];
