import { escapePointer } from "@redocly/openapi-core/lib/ref-utils.js";
import ts from "typescript";
import { addJSDocComment, tsLiteral, tsModifiers, tsPropertyIndex, UNKNOWN } from "../lib/ts.js";
import { getEntries } from "../lib/utils.js";
import type { HeaderObject, SecuritySchemeObject, TransformNodeOptions } from "../types.js";
import transformMediaTypeObject from "./media-type-object.js";
import transformSchemaObject from "./schema-object.js";

/**
 * Transform HeaderObject nodes (4.8.21)
 * @see https://spec.openapis.org/oas/v3.1.0#header-object
 */
export default function transformSecuritySchemes(securityScheme: SecuritySchemeObject, options: TransformNodeOptions): ts.TypeNode {
  const type: ts.TypeElement[] = [];
  for (const [k, v] of getEntries(securityScheme, options.ctx)) {
    const property = ts.factory.createPropertySignature(
      /* modifiers     */ tsModifiers({ readonly: options.ctx.immutable }),
      /* name          */ tsPropertyIndex(k),
      /* questionToken */ undefined,
      /* type          */ tsLiteral(v),
    );
    //addJSDocComment(mediaTypeObject, property);
    type.push(property);
  }
  return ts.factory.createTypeLiteralNode(type);

  return UNKNOWN;
}
