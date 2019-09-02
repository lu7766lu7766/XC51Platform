class CallApp {
    public static openUrl(url: string) {
        try {
            window['luck_m'].openUrl(url);
        } catch(e) {
            console.log(e)
        }
        try {
            window['webkit'].messageHandlers.openUrl.postMessage({
                url
            });
        } catch(e) {
            console.log(e)
        }
    }
}