export default function addHashToLocation(this: any, params: string): void {
    history.pushState(
        {},
        "",
        // TODO: Check if hash is required
        this.$route.path +"#/"+ params
    );
}