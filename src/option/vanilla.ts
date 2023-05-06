import { obtainSlot, optoinNullableMemberDecorator } from '../utils'
import { compatibleMemberDecorator } from '../deco3/utils'
export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('vanilla')
    map.set(name, true)
})
