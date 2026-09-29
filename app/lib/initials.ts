/** Up to two initials from a name, for logo placeholders ("The Corner Kitchen" -> "CK"). */
export function initials(name: string): string {
    const words = name.split(/\s+/).filter((w) => w && !/^(the|a|an|&|and)$/i.test(w));
    return (words.length ? words : [name]).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
}
