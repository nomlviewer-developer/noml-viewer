import yaml from 'js-yaml';
import type { NomlSchema, ValidationResult, ValidationError } from '../schema/types';

/**
 * NOML Parser
 *
 * DESIGN PRINCIPLE: Lenient Parsing
 * - Unknown/undefined parameters are silently ignored (not rendered, no errors)
 * - This allows forward compatibility and custom extensions
 * - Only minimum required fields cause errors: version, database, collections, fields.type
 */

/**
 * Parse YAML string to NOML Schema
 */
export function parseNoml(yamlString: string): {
  schema: NomlSchema | null;
  error: string | null;
} {
  try {
    const parsed = yaml.load(yamlString) as NomlSchema;
    return { schema: parsed, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unknown parsing error';
    return { schema: null, error };
  }
}

/**
 * Validate NOML Schema structure
 *
 * Validation is minimal and lenient:
 * - Required: version, database, collections (with at least one), fields.type
 * - Unknown fields are ignored (no errors)
 * - Unsupported database types show warning, not error
 */
export function validateNoml(schema: NomlSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Check version
  if (!schema.version) {
    errors.push({ path: 'version', message: 'Version is required', severity: 'error' });
  }

  // Check database type (warning for unsupported, not error)
  if (!schema.database) {
    errors.push({ path: 'database', message: 'Database type is required', severity: 'error' });
  } else if (schema.database !== 'firestore') {
    warnings.push({
      path: 'database',
      message: `Database "${schema.database}" is not fully supported. Some features may not render correctly.`,
      severity: 'warning',
    });
  }

  // Check collections
  if (!schema.collections || Object.keys(schema.collections).length === 0) {
    errors.push({
      path: 'collections',
      message: 'At least one collection is required',
      severity: 'error',
    });
  } else {
    // Validate each collection
    for (const [collectionName, collection] of Object.entries(schema.collections)) {
      if (!collection.fields || Object.keys(collection.fields).length === 0) {
        errors.push({
          path: `collections.${collectionName}.fields`,
          message: `Collection "${collectionName}" must have at least one field`,
          severity: 'error',
        });
      }

      // Validate fields - only require type
      if (collection.fields) {
        for (const [fieldName, field] of Object.entries(collection.fields)) {
          if (!field.type) {
            errors.push({
              path: `collections.${collectionName}.fields.${fieldName}.type`,
              message: `Field "${fieldName}" must have a type`,
              severity: 'error',
            });
          }
        }
      }

      // Recursively validate subcollections
      if (collection.subcollections) {
        for (const [subName, subCollection] of Object.entries(collection.subcollections)) {
          const subResult = validateCollection(
            subCollection,
            `collections.${collectionName}.subcollections.${subName}`
          );
          errors.push(...subResult.errors);
          warnings.push(...subResult.warnings);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a single collection
 */
function validateCollection(
  collection: unknown,
  path: string
): { errors: ValidationError[]; warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const col = collection as Record<string, unknown>;

  if (!col.fields || typeof col.fields !== 'object') {
    errors.push({
      path: `${path}.fields`,
      message: 'Collection must have fields',
      severity: 'error',
    });
    return { errors, warnings };
  }

  for (const [fieldName, field] of Object.entries(col.fields as Record<string, unknown>)) {
    const f = field as Record<string, unknown>;
    if (!f.type) {
      errors.push({
        path: `${path}.fields.${fieldName}.type`,
        message: `Field "${fieldName}" must have a type`,
        severity: 'error',
      });
    }
  }

  return { errors, warnings };
}

/**
 * Parse and validate NOML in one step
 */
export function parseAndValidateNoml(yamlString: string): {
  schema: NomlSchema | null;
  validation: ValidationResult;
  parseError: string | null;
} {
  const { schema, error: parseError } = parseNoml(yamlString);

  if (!schema) {
    return {
      schema: null,
      validation: { valid: false, errors: [], warnings: [] },
      parseError,
    };
  }

  const validation = validateNoml(schema);

  return {
    schema,
    validation,
    parseError: null,
  };
}
