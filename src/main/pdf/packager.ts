// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as debug_ from "debug";
import { TaJsonSerialize } from "r2-lcp-js/dist/es6-es2015/src/serializable";
import { tryCatch } from "readium-desktop/utils/tryCatch";

import { createWebpubZip, TResourcesBUFFERCreateZip } from "../zip/create";
import { pdfCover } from "./cover";
import { pdfManifest } from "./manifest";

// Logger
const _filename = "readium-desktop:main/pdf/packager";
const debug = debug_(_filename);

//
// API
//
export async function pdfPackager(pdfPath: string): Promise<string> {

    debug("pdf packager", pdfPath);

    const manifest = await pdfManifest(pdfPath);
    const manifestJson = TaJsonSerialize(manifest);
    const manifestStr = JSON.stringify(manifestJson);
    const manifestBuf = Buffer.from(manifestStr);

    debug("manifest");
    debug(manifest);

    const pdfCoverFn = () => pdfCover(pdfPath, manifest);
    const pngBuffer = await tryCatch(pdfCoverFn, _filename);
    const pngName = manifest?.Resources[0]?.Href || "";
    const coverResources: TResourcesBUFFERCreateZip =
        pngBuffer
            ? [
                [pngBuffer, pngName],
            ]
            : [];

    debug("cover", pngName);
    debug(pngBuffer);

    const pdfName = manifest?.Spine[0]?.Href || "";
    debug("pdf", pdfName);

    const webpubPath = await createWebpubZip(
        manifestBuf,
        [
            [pdfPath, pdfName],
        ],
        coverResources,
        "pdf",
    );

    return webpubPath;
}