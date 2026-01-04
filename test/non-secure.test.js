import { equal, match, notEqual, ok } from 'node:assert'
import { describe, test } from 'node:test'

import { urlAlphabet } from '../index.js'
import { customAlphabet, nanoid } from '../non-secure/index.js'

describe('non secure', () => {
  test('generates URL-friendly IDs', () => {
    for (let i = 0; i < 10; i++) {
      let id = nanoid()
      equal(id.length, 21)
      for (let char of id) {
        match(urlAlphabet, new RegExp(char, 'g'))
      }
    }
  })

  test('changes ID length', () => {
    equal(nanoid(10).length, 10)
  })

  test('generates ID with prefix', () => {
    let id = nanoid(21, 'usr_')
    ok(id.startsWith('usr_'))
    equal(id.length, 25) // 4 (prefix) + 21 (id)
  })

  test('generates ID with prefix and custom size', () => {
    let id = nanoid(10, 'ord_')
    ok(id.startsWith('ord_'))
    equal(id.length, 14) // 4 (prefix) + 10 (id)
  })

  test('generates ID with empty prefix', () => {
    let id = nanoid(21, '')
    equal(id.length, 21)
  })

  test('accepts string', () => {
    equal(nanoid('10').length, 10)
  })

  test('has no collisions', () => {
    let used = {}
    for (let i = 0; i < 100 * 1000; i++) {
      let id = nanoid()
      equal(used[id], undefined)
      used[id] = true
    }
  })

  test('has flat distribution', () => {
    let COUNT = 100 * 1000
    let LENGTH = nanoid().length

    let chars = {}
    for (let i = 0; i < COUNT; i++) {
      let id = nanoid()
      for (let char of id) {
        if (!chars[char]) chars[char] = 0
        chars[char] += 1
      }
    }

    equal(Object.keys(chars).length, urlAlphabet.length)

    let max = 0
    let min = Number.MAX_SAFE_INTEGER
    for (let k in chars) {
      let distribution = (chars[k] * urlAlphabet.length) / (COUNT * LENGTH)
      if (distribution > max) max = distribution
      if (distribution < min) min = distribution
    }
    ok(max - min <= 0.05)
  })

  test('nanoid / avoids pool pollution, infinite loop', () => {
    nanoid(2.1)
    let second = nanoid()
    let third = nanoid()
    notEqual(second, third)
  })

  test('customAlphabet / has options', () => {
    let nanoidA = customAlphabet('a', 5)
    equal(nanoidA(), 'aaaaa')
  })

  test('customAlphabet / has flat distribution', () => {
    let COUNT = 100 * 1000
    let LENGTH = 5
    let ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
    let nanoid2 = customAlphabet(ALPHABET, LENGTH)

    let chars = {}
    for (let i = 0; i < COUNT; i++) {
      let id = nanoid2()
      for (let char of id) {
        if (!chars[char]) chars[char] = 0
        chars[char] += 1
      }
    }

    equal(Object.keys(chars).length, ALPHABET.length)

    let max = 0
    let min = Number.MAX_SAFE_INTEGER
    for (let k in chars) {
      let distribution = (chars[k] * ALPHABET.length) / (COUNT * LENGTH)
      if (distribution > max) max = distribution
      if (distribution < min) min = distribution
    }
    ok(max - min <= 0.05)
  })

  test('customAlphabet / avoids pool pollution, infinite loop', () => {
    let ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
    let nanoid2 = customAlphabet(ALPHABET)
    nanoid2(2.1)
    let second = nanoid2()
    let third = nanoid2()
    notEqual(second, third)
  })
})
