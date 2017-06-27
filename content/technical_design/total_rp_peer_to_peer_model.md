/*
Title: Total RP Peer to Peer Model
Sort: 101
*/

The **Total RP Peer to Peer Model** (or TRP2P) is a complex peer-to-peer communication model.

It is used for almost every data exchange between TRP3 players.

## Model concept

The **TRP2P** is a ***layered*** model, inspired by the [Open Systems Interconnection model (OSI Model)](http://en.wikipedia.org/wiki/OSI_model) but with only 4 layers. Each layer has its own responsabilities and communicate only with the two adjacent layers.

![Model diagram](TRP2P.png)

## Layer 3: Structure layer

This is the layer used by the user. When the player want to send a value to another player, it use the Structure layer to send his data. The data is a `Lua` value. Any Lua value: a `string`, a `number`, a `table` ... Most of the time it will be a `hash table` though, much more easy to handle on both sides.

The layer will create a **structure** composed of the data and a **prefix**. The **prefix** is an identification for the structure, an ID of "*what to do with this structure*" once it arrive on the other side.

Any part of the code can attach a handler to a specific prefix. When data bound to this prefix are received, every handler is called with the data.

### Structure layer inputs

The layer gets:

* The **data** to be transmited
* The **prefix** attached to this data
* The **target** for this data (character ID)
* The **priority** of the data (based on [ChatThrottleLib][CTL] priorities)

~~~Lua
function Comm.sendObject(prefix, object, target, priority)
~~~

It packages the prefix and the data into a **structure** and push that **structure** to the **Message layer** with the **priority** and the **target**.

### Structure layer outputs

The layer gets:

* The **structure**
* The **sender** of the data

~~~Lua
function receiveObject(structure, sender)
~~~

When receiving a **structure** from the **Message layer**, it unpacks the structure to separate the **prefix** from the **data**.

The layer will then call any **handler** registered to this **prefix**, attaching the **data** and the **sender** to the call.

## Layer 2: Message layer

This layer purpose is to handle structure serialization, message deserialization and message cutting/recomposing.

### Message layer inputs

The layer gets:

* The **structure** from the structure layer
* The **target** for this data (character ID)
* The **priority** of the data

~~~Lua
local function handleStructureOut(structure, target, priority)
~~~

The **structure** is serialized (using [Ace-Serializer](http://www.wowace.com/addons/ace3/pages/api/ace-serializer-3-0/)) into a **message**. A two-characters long message **ID** is generated for this **message**.

This **message** is then cut into pieces of maximum `245` characters: the **packets**.

The **message ID** and the **bag of packets** are push to the **Packets layer** (always with the **target** and **priority**).

### Message layer outputs

The layer gets:

* The **packets**
* The **sender** of the data

~~~Lua
function handleStructureIn(packets, sender)
~~~

It reassembles the **message** and deserializes it to a **structure**.

It sends the **structure** to the structure layer, with the **sender**.

## Layer 1: Packets layer

This layer purpose is to send and store packets.

### Packets layer inputs

The layer gets:

* The **message ID** from the message layer
* The **bag of packets** from the message layer
* The **target** for this data (character ID)
* The **priority** of the data

~~~Lua
local function handlePacketsOut(messageID, packets, target, priority)
~~~

This layer send each **packet** with the precaution of attach to it the **message ID**. Also to each packet is attach a **control character**. This **control character** will tell the other side is the packet is the last for this **message ID** or if other packets will come.

The packets are sent to the **communication layer**, with the **target** and **priority**.

### Packets layer outputs

The layer gets:

* The **packet**
* The **sender** of the data

~~~Lua
function handlePacketsIn(packet, sender)
~~~

The layer will detach the **message ID** and the **control character** from the packet. It will store the packet into a "bag" specific to the **message ID** and, if the **control character** indicates that it is the last packet to be received for this message, push the **packets bag** to the **message layer**.

## Layer 0: Communication layer

This layer determines "*how*" to send the data to the target. For that it uses **communication interfaces**.

The interface used by everyone is the `wow` interface which uses `SendAddonMessage` over [ChatThrottleLib][CTL], using the priority.

The other two interfaces are used for dev and debugging purpose: the `direct relay` interface is like a "localhost" sending all packets to yourself, and the `direct print` prints the packet to the chat frame.

# Advantage of this model

* Can handle heavy concurrent data sending.
* Very robust.
* Easy to use.
* Easy to monitore.
* Easy to debug.

# Caveats of this model

* Implementation can be enhanced.
* Quite heavy memory consumption.
* Can be "*overkill*" when sending small amounts of data.

[CTL]: http://www.wowwiki.com/ChatThrottleLib
