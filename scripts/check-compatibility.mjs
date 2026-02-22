#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REQUIRED_NODE_VERSION = '24.13.0'
const REQUIRED_NPM_VERSION = '11.6.2'

function parseVersion(version) {
  return version.split('.').map(Number)
}

function compareVersions(required, current) {
  const [reqMajor, reqMinor, reqPatch] = parseVersion(required)
  const [curMajor, curMinor, curPatch] = parseVersion(current)

  if (curMajor > reqMajor) return true
  if (curMajor < reqMajor) return false
  if (curMinor > reqMinor) return true
  if (curMinor < reqMinor) return false
  return curPatch >= reqPatch
}

try {
  const nodeVersion = process.version.replace('v', '')
  const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim()

  console.log('\n📋 Compatibility Check:')
  console.log(`├─ Node.js: ${nodeVersion} (required: ${REQUIRED_NODE_VERSION})`)
  console.log(`├─ npm: ${npmVersion} (required: ${REQUIRED_NPM_VERSION})`)

  const nodeOk = compareVersions(REQUIRED_NODE_VERSION, nodeVersion)
  const npmOk = compareVersions(REQUIRED_NPM_VERSION, npmVersion)

  console.log(
    `├─ Node.js: ${nodeOk ? '✅ OK' : '❌ INCOMPATIBLE'}`
  )
  console.log(
    `└─ npm: ${npmOk ? '✅ OK' : '❌ INCOMPATIBLE'}`
  )

  if (!nodeOk || !npmOk) {
    console.error('\n⚠️  Version Requirements Not Met')
    if (!nodeOk) {
      console.error(`   Please install Node.js ${REQUIRED_NODE_VERSION} or higher`)
    }
    if (!npmOk) {
      console.error(`   Please install npm ${REQUIRED_NPM_VERSION} or higher`)
    }
    process.exit(1)
  }

  console.log('\n✅ All compatibility requirements met!\n')
  process.exit(0)
} catch (error) {
  console.error('Error checking compatibility:', error.message)
  process.exit(1)
}
