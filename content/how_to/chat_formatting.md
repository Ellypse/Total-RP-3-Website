/*
Title: Chat formatting in Total RP 3
*/

Total RP 3 offers chat formatting features to simulate NPC talking or emoting and detect out-of-character messages and inline emotes. We do not have a graphical user interface for the NPC chat feature for now (it will be introduced with the Extended module), but the detection algorithm is already in place so you can manually enter NPC chat commands.

The default pattern used to detect NPC chats is `|` (this is the [vertical bar](https://en.wikipedia.org/wiki/Vertical_bar) _or pipe character_, not a lower L or an upper i). You can change the detection pattern to a different one in the chat settings if you are used to using another character. Start a message with this character followed by a white space and it will be identified as a NPC chat.

> **Please note:** The messages sent are not modified (we can't do that for technical reasons). The messages are only formatted once received. This means people who are not using Total RP 3 or Total RP 2 may not view the message formatted as desired. Some other add-ons may implement this feature and be compatible with ours.

# NPC talk

To send a message as if a NPC said it you must use the NPC chat detection pattern `|` followed by anything you want (the name of the NPC) followed by "says: " and your text.

For example, the following input

```txt
| Elsa says: Let it go.
```

will output as

> Elsa says: Let it go.

in the chat frame colored as an NPC dialog.

# NPC emotes

To send an emote for a NPC you must use the NPC chat detection pattern `|` followed by the name of the NPC and your emote.

For example, the following input

```txt
| Anna wants to build a snowman.
```

will output as

> <span style="color:#F87431">Anna wants to build a snowman.</span>

in the chat frame colored as an emote.

# Headless emotes

You can also send "headless" emotes, which are emotes that are not related to a person. You must use the NPC chat detection pattern `|` followed by your emote.

For example, the following input

```txt
| The snow glows white on the mountain tonight.
```

will output as

> <span style="color:#F87431">The snow glows white on the mountain tonight.</span>

in the chat frame colored as an emote.

# Inline emotes

Total RP 3 will color inline emotes inside messages. The default pattern for detecting emotes is `* emote *`. You can change the pattern to use `** emote **`, `< emote >` or both `* emote *` and `< emote >` in the chat settings of the add-on. Text inside the pattern will be colored like emotes.

For example, the following input

```txt
It's time to see what I can do. *builds a giant ice castle* To test the limits and break through.
```

will output

> It's time to see what I can do. <span style="color:#F87431">\*builds a giant ice castle\*</span> To test the limits and break through.

# Out-of-character messages

Total RP 3 can detect out-of-character and color them (in grey by default). The default pattern for detecting out-of-character text is `()`. You can change the pattern to use `(())` in the settings. Text inside the pattern will be greyed out.

For example, the following input

```txt
Conceal, don't feel, don't let them know (well know they know).
```

will output

> Conceal, don't feel, don't let them know <span style="color:#AAAAAA">(well know they know).</span>
