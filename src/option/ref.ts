import type { Cons } from '../component'
import { type OptionBuilder, applyAccessors } from '../optionBuilder'
import { obtainSlot, optoinNullableMemberDecorator } from '../utils'
import { compatibleMemberDecorator } from '../deco3/utils'
export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('ref')
    map.set(name, true)
})


export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const names = slot.getMap('ref')
    if (!names || names.size === 0) {
        return
    }

    applyAccessors(optionBuilder, (ctx: any) => {
        const data: Map<string, { get: () => any, set: undefined }> = new Map
        names.forEach((value, name) => {
            data.set(name, {
                get: function (this: any) {
                    return ctx.$refs[name]
                },
                set: undefined
            })
        })
        return data
    })

}
