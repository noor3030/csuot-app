export default function addHashToLocation(this: any, params: string): void {
  history.pushState({}, "", this.$route.path + params);
}
