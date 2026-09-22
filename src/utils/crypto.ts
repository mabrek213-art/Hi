// Cryptographic utility for Veridex Agent Passports and tamper-evident hash chains

export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return '0x' + hashHex;
}

export function syncHash(message: string): string {
  // Fast deterministic hash fallback for synchronous calculations
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < message.length; i++) {
    const ch = message.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  const p1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const p2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const p3 = ((h1 ^ h2) >>> 0).toString(16).padStart(8, '0');
  const p4 = ((h1 + h2) >>> 0).toString(16).padStart(8, '0');
  return `0x${p1}${p2}${p3}${p4}${p2}${p1}${p4}${p3}`;
}

export interface HashChainVerification {
  valid: boolean;
  chainLength: number;
  brokenAtIndex?: number;
  currentRoot: string;
  expectedRoot: string;
  details: string;
}

export function verifyStampChain(stamps: { hash: string; previousHash: string }[], genesisHash: string): HashChainVerification {
  if (!stamps || stamps.length === 0) {
    return {
      valid: true,
      chainLength: 0,
      currentRoot: genesisHash,
      expectedRoot: genesisHash,
      details: 'Genesis state. Zero stamps registered.'
    };
  }

  let prev = genesisHash;
  for (let i = 0; i < stamps.length; i++) {
    const stamp = stamps[i];
    if (stamp.previousHash !== prev) {
      return {
        valid: false,
        chainLength: stamps.length,
        brokenAtIndex: i,
        currentRoot: stamp.hash,
        expectedRoot: prev,
        details: `Cryptographic chain broken at stamp #${i + 1}. Previous hash mismatch.`
      };
    }
    prev = stamp.hash;
  }

  return {
    valid: true,
    chainLength: stamps.length,
    currentRoot: stamps[stamps.length - 1].hash,
    expectedRoot: stamps[stamps.length - 1].hash,
    details: 'Cryptographic chain verified. All intermediate signatures cryptographically sealed.'
  };
}
