Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    data() {
        return {
            maxMessages: 50,
            currentMessage: '',
            visible: true,
            messages: [
                '{FF4040}Welcome to the alt:V Open Source Chat'
            ]
        };
    },
    computed: {
        reversedMessages() {
            return this.messages.slice().reverse();
        }
    },
    methods: {
        appendMessage(message) {
            console.log(message);
            this.messages.push(message);

            if (this.messages.length > this.maxMessages) {
                this.messages.shift();
            }
        },
        setVisibility(state) {
            this.visible = state;
        },
        focusInput() {
            if (!this.visible) return;

            this.currentMessage = '';
            this.$refs.input.focus();
        },
        send() {
            this.$refs.input.blur();

            if (/^\s*$/.test(this.currentMessage)) {
                this.unfocus();
                return;
            }

            if ('alt' in window) {
                alt.emit('chat:Send', this.currentMessage);
            } else {
                this.appendMessage(this.currentMessage);
            }

            this.currentMessage = '';
        },
        unfocus() {
            this.currentMessage = '';
            this.$refs.input.blur();
            alt.emit('chat:StopInput');
        },
        pageDown() {
            this.$refs.messages.scrollTop += this.$refs.messages.offsetHeight;
        },
        pageUp() {
            this.$refs.messages.scrollTop -= this.$refs.messages.offsetHeight;
        }
    },
    filters: {
        colorify(text) {
            let matches = [];
            let m = null;
            let curPos = 0;

            if (!text) {
                return;
            }

            do {
                m = /\{[A-Fa-f0-9]{3}\}|\{[A-Fa-f0-9]{6}\}/g.exec(text.substr(curPos));

                if (!m) {
                    break;
                }

                matches.push({
                    found: m[0],
                    index: m['index'] + curPos
                });

                curPos = curPos + m['index'] + m[0].length;
            } while (m != null);

            if (matches.length > 0) {
                text += '</font>';

                for (let i = matches.length - 1; i >= 0; --i) {
                    let color = matches[i].found.substring(1, matches[i].found.length - 1);
                    let insertHtml = (i != 0 ? '</font>' : '') + '<font color="#' + color + '">';
                    text = text.slice(0, matches[i].index) + insertHtml + text.slice(matches[i].index + matches[i].found.length, text.length);
                }
            }

            return text;
        }
    },
    mounted() {
        if ('alt' in window) {
            alt.on('chat:Message', this.appendMessage);
            alt.on('chat:Visibility', this.setVisibility);
            alt.on('chat:Input', this.focusInput);
            alt.on('chat:PageUp', this.pageUp);
            alt.on('chat:PageDown', this.pageDown);

            alt.emit('chat:Ready');
        }
    }
});
