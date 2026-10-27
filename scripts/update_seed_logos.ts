import fs from 'fs';
import path from 'path';

const seedFile = path.resolve(process.cwd(), 'src/data/seedData.ts');
let content = fs.readFileSync(seedFile, 'utf-8');

const logoMapping: Record<string, string> = {
  snoonu: '/logos/snoonu.svg',
  skipcash: '/logos/skipcash.svg',
  cwallet: '/logos/cwallet.svg',
  'avey-health': '/logos/avey.svg',
  urbanpoint: '/logos/urbanpoint.svg',
  'droobi-health': '/logos/droobi.svg',
  karty: '/logos/karty.svg',
  'airlift-systems': '/logos/airlift.svg',
  rimads: '/logos/rimads.svg',
  applab: '/logos/applab.svg',
  subol: '/logos/subol.svg',
  'em5-education': '/logos/em5.svg',
  atpick: '/logos/atpick.svg',
  spendwisor: '/logos/spendwisor.svg',
  dohabuddy: '/logos/dohabuddy.svg',
  ebutler: '/logos/ebutler.svg',
  fatora: '/logos/fatora.svg',
  meddy: '/logos/meddy.svg',
  kenzz: '/logos/kenzz.svg',
  debito: '/logos/debito.svg',
  volante: '/logos/volante.svg',
  'q-tickets': '/logos/qtickets.svg',
  'shamal-technologies': '/logos/shamal.svg',
  'torod-logistics': '/logos/torod.svg',
  bonocle: '/logos/bonocle.svg',
  paperfly: '/logos/paperfly.svg',
  'tean-edtech': '/logos/tean.svg',
  'q-auto-tech': '/logos/qauto.svg',
  'clever-clean': '/logos/cleverclean.svg',
  modaris: '/logos/modaris.svg',
  pay2go: '/logos/pay2go.svg',
  'synergy-ai': '/logos/synergy.svg',
  'aldelaimi-biosciences': '/logos/aldelaimi.svg',
  ooredoo: '/logos/ooredoo.svg',
  'qnb-group': '/logos/qnb.svg',
  'rasmal-ventures': '/logos/rasmal.svg',
  'doha-tech-angels': '/logos/dta.svg',
  'al-mana-capital': '/logos/almana.svg',
  'qstp-tech-venture-fund': '/logos/qstp.svg',
  'qia-fund-of-funds': '/logos/qia.svg',
  'jaidah-capital': '/logos/jaidah.svg',
  'mannai-tech-investments': '/logos/mannai.svg',
  'qfth-hub': '/logos/qfth.svg',
  'tech-park-incubator': '/logos/techpark.svg'
};

let replaced = 0;
for (const [id, logoPath] of Object.entries(logoMapping)) {
  // Regex to find entity block with "id": "id" and replace its "logo": "XX"
  const entityBlockRegex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"logo":\\s*")[^"]*(")`);
  if (entityBlockRegex.test(content)) {
    content = content.replace(entityBlockRegex, `$1${logoPath}$2`);
    replaced++;
  }
}

fs.writeFileSync(seedFile, content, 'utf-8');
console.log('Successfully updated ' + replaced + ' entity logos in seedData.ts');
