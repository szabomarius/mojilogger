# mojilogger
Console logs tagged with a unique emoji based on *any* identifiers to easily distinguish between identical log sources.

🔷 Typescript ready
✅ Wrapper over `console.log`

---

## Installation
npm:
```bash
npm install mojilogger
```
or with yarn:
```bash
yarn add mojilogger
```

## Usage
### Basic Usage
#### Import the mojilogger:
```javascript
import { mojilogger } from 'mojilogger';
```
#### Log a message with an id:
```javascript
mojilogger.withId('API').log('Fetching data...');
// Console Output: 🌟 Fetching data...
```
#### Log a message without id:
<sub>This will use the 💬, if this is taken it will use another one from the list or generate an unused one</sub>
```javascript
mojilogger.log('Hello World!');
// Console Output: 💬 Hello World!
```

#### Log multiple messages with different ids:

```javascript
mojilogger.withId('API').log('Fetching data...');
mojilogger.withId('DB').log('Fetching data...');
mojilogger.withId('API').log('Data received...');
mojilogger.withId('DB').log('Data received...');
// Console Output: 🌟 Fetching data...
// Console Output: 💧 Fetching data...
// Console Output: 🌟 Data received...
// Console Output: 💧 Data received...
```

#### Assign a custom emoji for specific id:
```javascript
mojilogger.withId('API','👽').log('Fetching data...');
mojilogger.withId('DB').log('Fetching data...');
mojilogger.withId('API').log('Data received...');
mojilogger.withId('DB').log('Data received...');
// Console Output: 👽 Fetching data...
// Console Output: 💧 Fetching data...
// Console Output: 👽 Data received...
// Console Output: 💧 Data received...
```

#### To get the map of identifiers to emojis:

```javascript
const map = mojilogger.getMojiMap();
console.log(map);
```

#### You can use existing console log functionalities:
```javascript
const data = 20;
mojilogger.withId('DB').log('Fetching data...', data);
// Console Output: 🌟 Fetching data... 20
```

### Custom Emoji List
The default emoji list starts with the star emoji "🌟" and is as follows:
```bash
"🌟", "💧", "❤️", "🚗", "🎵", "⏰", "🔑",
"🎈", "📘", "⚽", "✈️", "🚢", "⚡", "🍎",
"☎️", "📺", "💡", "🔔", "⚓", "📷", "🎉",
"🏠", "⛅", "🌈", "🔒", "🛒", "🎨", "⛵",
"💼", "🎭", "🕰️", "🧲", "🎻", "🏰", "🌵",
"🌶️", "📌", "🔍", "⚖️", "⛔", "🚸", "📵",
"🔞", "🛑", "🛠️", "🎖️", "🚫", "🔴", "🟠",
"🟡", "🟢", "🟣", "🟤", "⚫", "❗", "❓",
"🔶", "🟥", "🟧", "🟨", "🟩", "🟪", "🎲",
"🍀", "🎳", "🔕", "📬", "🪁", "🔭"
```

After `🔭`, the logger will generate unused emojis until it reaches out of unique ones.
Will assign `o🚫o` to all other ids when it runs out of emojis. (More precise after 1778 emojis are used)

**You can set a custom emoji list for new identifiers:**
```javascript
mojilogger.setMojiList(['😄','🌈','🚀']);
mojilogger.withId('API').log('Fetching data...');
// Console Output: 😄 Fetching data...
```

**To retrieve the emoji list being used:**
```javascript
const list = mojilogger.getMojiList();
console.log(list);
```

#### Resetting the Logger
To reset all mappings and restore to default state:
```javascript
mojilogger.resetAll();
```

---

❗❗❗ ***Caution***: Be careful with memory leaks. This package stores each ID in memory to map it to an emoji. Therefore, it's advisable to use this package only in development environments.

### Creative usages
store the logger after scoping it with an id:
```typescript
import { mojilogger, type MojiLog } from 'mojilogger';
class Service {
  private readonly logger: MojiLog;
  constructor() {
    this.logger = mojilogger.withId(this);
    this.logger.log('Hello from this service');
  }
}
```
```typescript
const serviceOne = new Service();
const serviceTwo = new Service();
// Console Output: 🌟 Hello from this service
// Console Output: 💧 Hello from this service
```
extend / modify the default moji list:
```javascript
const list = mojilogger.getMojiList();
mojilogger.setMojiList([...['😄'], ...list]);
mojilogger.withId('API').log('Fetching data...');
mojilogger.withId('DB').log('Fetching data...');
// Console Output: 😄 Fetching data...
// Console Output: 🌟 Fetching data...
```

---

### License
This project is licensed under the MIT License - see the LICENSE.md file for details.
