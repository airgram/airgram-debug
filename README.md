# Airgram debug

Extends base Airgram logger.

## Installation
```bash
npm install airgram-debug
```

Basic usage with TypeScript:

```typescript
import { ag, TYPES } from 'airgram'
import { getCalleeName } from 'airgram/helpers'
import DebugLogger from 'airgram-debug'

airgram.bind<ag.Logger & { level: string }>(TYPES.Logger).to(DebugLogger)
  .onActivation((context, logger) => {
    logger.namespace = [getCalleeName(context)]
    logger.level = 'verbose'
    return logger
  })
```

Basic usage with JavaScript:

```typescript
const {Airgram, AuthDialog, TYPES} = require('airgram')
const {getCalleeName} = require('airgram/helpers')
const DebugLogger = require('airgram-debug')

airgram.bind(TYPES.Logger).to(DebugLogger).onActivation((context, logger) => {
  logger.namespace = [getCalleeName(context)]
  logger.level = 'verbose'
  return logger
})
```
