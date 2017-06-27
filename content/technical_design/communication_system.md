/*
Title: Communication system
Sort: 100
*/

Total RP 3 uses several communication protocols. Some are home made, some are standard used by other Addons (like the Mary Sue Protocol used by MyRoleplay and XRP).

## Protocols

Here is the list of all protocols used by TRP3.

- [Total RP Peer to Peer Model][TRP2P] (**TRP2P**)
- [Roleplay Broadcast Protocol][RPB] (**RPB**)
- [Mary Sue Protocol][MSP] (**MSP**)

## Total RP Peer to Peer Model

**[Total RP Peer to Peer Model][TRP2P]** is an open communication model, currently used only by **Total RP 3**.

It's the protocol used by TRP3 to exchange data between two TRP3 players. It allows to send any type of data, bound to a certain prefix.

## Roleplay Broadcast Protocol


**[Roleplay Broadcast Protocol][RPB]** is an open protocol, currently used by **Total RP 3** and **Total RP 2**.

It's a protocol allowing to send data to a maximum of connected players (also using the protocol). It's based on the connection to a common channel (typically `xtensionxtooltip2`).

For example, TRP 2 and 3 use it for the ***characters location on map*** feature.

## Mary Sue Protocol

**[Mary Sue Protocol][MSP]** is an open peer-to-peer protocol, currently used by a wide range of roleplay addons like TRP 2 & 3, MyRoleplay, XRP, FlagRSP ...

The great advantage is that it allows communication with other roleplay addons that are widelly used. 

# Why not using MSP only ?

Because the **Mary Sue Protocol** is not an "*extensible*" exchange protocol.

* You can only exchange string values. You can't exchange structure. (Not without serialize them yourself)
* Each field must be prefixed with a two-characters long ID: the possibilities are very limited.
* The public implementation does not work very well when exchanging huge amount of data.

This protocol was created by the creator of **MyRoleplay**, and we can feel the influence from the **MRP** usage in its creation.

The idea of a **common RP protocol** was great, but too bad it was though by one person without further discussion with other RP addon authors.

To be simple: **MSP** is more of a *compatibility protocol for interacting with MRP* than a real *data exchange protocol*.


[TRP2P]: total_rp_peer_to_peer_model
[RPB]: roleplay_broadcast_protocol
[MSP]: mary_sue_protocol