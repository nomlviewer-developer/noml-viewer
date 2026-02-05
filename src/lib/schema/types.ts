/**
 * NOML Schema Type Definitions
 * Version: 1.0.0
 *
 * NOTE: This schema is lenient by design.
 * - Unknown/undefined parameters will be silently ignored (not rendered, no errors)
 * - This allows forward compatibility and custom extensions
 */

// Firestore field types
export type FirestoreFieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'timestamp'
  | 'geopoint'
  | 'reference'
  | 'array'
  | 'map'
  | 'null';

// ===========================================
// Enum Definitions
// ===========================================

// Enum value can be a simple string or an object with value/label/description
export interface EnumValueDef {
  value: string | number;
  label?: string;
  description?: string;
}

// Enum definition with optional state machine transitions
export interface EnumDef {
  description?: string;
  values: (string | number | EnumValueDef)[];
  transitions?: Record<string, string[]>;
}

// ===========================================
// Key Definitions (Primary/Foreign/Unique)
// ===========================================

export interface ForeignKeyDef {
  field: string;
  references: string; // format: "collection.field"
  onDelete?: 'cascade' | 'restrict' | 'setNull';
  nullable?: boolean;
  isArray?: boolean;
  description?: string;
}

export interface UniqueKeyDef {
  field: string;
  enforceBy?: string;
  description?: string;
}

export interface CompositeUniqueKeyDef {
  fields: string[];
  enforceBy?: string;
  functionName?: string;
  description?: string;
}

export interface KeysDef {
  primary?: string;
  description?: string;
  foreign?: ForeignKeyDef[];
  unique?: UniqueKeyDef[];
  compositeUnique?: CompositeUniqueKeyDef[];
}

// ===========================================
// Field Validation
// ===========================================

export interface FieldValidation {
  // Number constraints
  min?: number;
  max?: number;
  // String constraints
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: 'email' | 'url' | 'uuid' | string;
  // Array constraints
  minItems?: number;
  maxItems?: number;
  // Inline enum (deprecated - use enums definition instead)
  enum?: string[];
}

// ===========================================
// Denormalization
// ===========================================

export interface DenormalizationTarget {
  collection: string;
  field: string;
  condition?: string;
  key?: string;
}

export interface DenormalizationDef {
  targets?: DenormalizationTarget[];
  syncMethod?: string;
  functionName?: string;
}

export interface DenormalizedFromDef {
  collection: string;
  field: string;
  key?: string;
}

// ===========================================
// Computed Fields
// ===========================================

export interface ComputedDef {
  method?: string;
  functionName?: string;
  trigger?: string;
  formula?: string;
}

// ===========================================
// Field Definitions
// ===========================================

// Base field definition
export interface BaseFieldDef {
  type: FirestoreFieldType | string; // Can be enum name
  description?: string;
  required?: boolean;
  nullable?: boolean;
  default?: unknown;
  example?: unknown;
  source?: 'documentId' | string;
  immutable?: boolean;
  autoUpdate?: boolean;
  validation?: FieldValidation;
  security?: string;
  denormalization?: DenormalizationDef;
  denormalizedFrom?: DenormalizedFromDef | string;
  computed?: ComputedDef;
  // Legacy support
  constraints?: FieldValidation;
}

// Reference field
export interface ReferenceFieldDef extends BaseFieldDef {
  type: 'reference';
  target: string;
}

// Array field
export interface ArrayFieldDef extends BaseFieldDef {
  type: 'array';
  items: string | { type: FirestoreFieldType | string };
}

// Map field
export interface MapFieldDef extends BaseFieldDef {
  type: 'map';
  fields?: Record<string, FieldDef>;
}

// Union of all field types
export type FieldDef = BaseFieldDef | ReferenceFieldDef | ArrayFieldDef | MapFieldDef;

// ===========================================
// Index Definitions
// ===========================================

export interface IndexFieldDef {
  field: string;
  order?: 'asc' | 'desc';
  arrayContains?: boolean;
}

export interface IndexDef {
  name?: string;
  description?: string;
  fields: (string | IndexFieldDef)[];
  order?: ('asc' | 'desc')[]; // Legacy support
  queryExample?: string;
}

// ===========================================
// Security Rules
// ===========================================

export interface SecurityRuleDef {
  condition: string;
  description?: string;
  excludeFields?: string[];
}

export interface SecurityDef {
  read?: SecurityRuleDef[];
  create?: SecurityRuleDef[];
  update?: SecurityRuleDef[];
  delete?: SecurityRuleDef[];
}

// ===========================================
// Collection Definitions
// ===========================================

export interface CollectionDef {
  description?: string;
  path?: string;
  keys?: KeysDef;
  fields: Record<string, FieldDef>;
  subcollections?: Record<string, CollectionDef>;
  indexes?: IndexDef[];
  security?: SecurityDef;
}

// ===========================================
// Root Schema
// ===========================================

export interface NomlMetadata {
  name: string;
  description?: string;
  author?: string;
}

export interface NomlSchema {
  version: string;
  database: 'firestore' | string; // MVP: Firestore only, extensible for future
  description?: string;
  updatedAt?: string;
  metadata?: NomlMetadata;
  enums?: Record<string, EnumDef>;
  collections: Record<string, CollectionDef>;
  functions?: Record<string, unknown>; // Cloud Functions (not rendered, but accepted)
}

// ===========================================
// Validation Result
// ===========================================

export interface ValidationError {
  path: string;
  message: string;
  severity?: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationError[];
}
