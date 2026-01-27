import { GameEvent } from './types';

// 1. 【战斗】类事件 (Combat)
export const COMBAT_EVENTS: GameEvent[] = [
  {
    id: 'combat_slime',
    category: 'combat',
    name: { en: 'Slime Encounter', zh: '遭遇史莱姆' },
    check: { primary: 'agility', secondary: 'speed', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Slime Defeated!', zh: '史莱姆击破！' },
      contents: [
        { en: 'Poked the slime with one finger and it burst into rainbow sparkles! Got some nice shots of the splash.', zh: '用手指戳破了史莱姆，液体飞溅出彩虹光泽！拍到了超美的瞬间。' },
        { en: 'The slime never stood a chance. One poke and it exploded into glittery goo everywhere!', zh: '史莱姆毫无还手之力，轻轻一戳就炸成了闪闪发光的粘液！' },
        { en: 'Victory! The slime popped like a water balloon. My reflexes are getting better!', zh: '胜利！史莱姆像水球一样爆开了。我的反应速度越来越快了！' }
      ],
      tags: ['#combat', '#monster', '#slime'],
      materials: 3
    },
    failure: {
      title: { en: 'Slimed...', zh: '被糊了一脸...' },
      contents: [
        { en: 'The slime got me... now I have goo all over my face. At least it smells like grapes?', zh: '被史莱姆糊了一脸...至少闻起来像葡萄味的？' },
        { en: 'Got wrapped up by the slime and rolled around like a ball. So embarrassing...', zh: '被史莱姆包裹成球在地上滚来滚去，太丢人了...' },
        { en: 'Note to self: slimes are faster than they look. Currently covered in goo.', zh: '备忘：史莱姆比看起来快多了。目前全身都是粘液。' }
      ],
      tags: ['#combat', '#monster', '#fail'],
      materials: 1
    }
  },
  {
    id: 'combat_dragon',
    category: 'combat',
    name: { en: 'Dragon Overhead', zh: '巨龙过境' },
    check: { primary: 'willpower', secondary: 'luck', mode: 'or', threshold: 50 },
    rarity: 'rare',
    success: {
      title: { en: 'Dragon Photo!', zh: '巨龙同框！' },
      contents: [
        { en: 'A dragon flew overhead! Managed to pose with a peace sign while its shadow loomed behind me. Epic shot!', zh: '巨龙从头顶飞过！成功背对镜头比了个耶，背景是龙影。史诗级照片！' },
        { en: 'Stayed calm as the dragon passed. Got an amazing silhouette shot with the beast in the background!', zh: '巨龙经过时保持冷静，拍到了超棒的剪影照，背景是巨龙！' },
        { en: 'The ground shook as the dragon flew by. I stood my ground and got THE shot of a lifetime!', zh: '巨龙飞过时大地都在震动。我站稳了脚跟，拍到了此生最棒的照片！' }
      ],
      tags: ['#dragon', '#epic', '#onceinlifetime'],
      materials: 8
    },
    failure: {
      title: { en: 'Dragon Roar!', zh: '被龙吼震飞！' },
      contents: [
        { en: 'The dragon roared and my hair literally exploded. I look like a dandelion now...', zh: '巨龙一声怒吼，我的头发直接炸成了蒲公英...' },
        { en: 'Got so scared I dove into a rock crevice. Missed the shot completely.', zh: '吓得躲进了岩石缝里，完全错过了拍照机会。' },
        { en: 'The dragon\'s roar turned my hair into an afro. Fashion disaster of the century.', zh: '龙吼把我的头发震成了爆炸头。本世纪最大的时尚灾难。' }
      ],
      tags: ['#dragon', '#scary', '#fail'],
      materials: 2
    }
  },
  {
    id: 'combat_goblin',
    category: 'combat',
    name: { en: 'Goblin Thief', zh: '哥布林小偷' },
    check: { primary: 'speed', secondary: 'agility', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Thief Caught!', zh: '小偷落网！' },
      contents: [
        { en: 'Tripped the goblin with style and got my wallet back! Even posed for a victory photo.', zh: '帅气地绊倒了哥布林，夺回了钱包！还摆了个胜利姿势拍照。' },
        { en: 'Chased down that sneaky goblin in seconds. Nobody steals from this adventurer!', zh: '几秒钟就追上了那只狡猾的哥布林。没人能从这位冒险者手里偷东西！' },
        { en: 'The goblin thought it could outrun me. It was wrong. Very wrong.', zh: '哥布林以为能跑过我。它错了，大错特错。' }
      ],
      tags: ['#chase', '#justice', '#gotcha'],
      materials: 4
    },
    failure: {
      title: { en: 'Wallet Gone...', zh: '钱包没了...' },
      contents: [
        { en: 'Chased the goblin but tripped and fell. Now I\'m sitting here crying over my lost wallet...', zh: '追哥布林时摔倒了，钱包被抢走了，坐在地上哭...' },
        { en: 'That goblin was TOO fast. Goodbye wallet, goodbye dignity.', zh: '那只哥布林太快了。再见了钱包，再见了尊严。' },
        { en: 'Tried to catch the thief, ended up face-first in the mud. The goblin is probably laughing somewhere.', zh: '想抓小偷，结果脸朝下摔进了泥里。哥布林大概在某处嘲笑我吧。' }
      ],
      tags: ['#chase', '#unlucky', '#broke'],
      materials: 0
    }
  },
  {
    id: 'combat_magic_duel',
    category: 'combat',
    name: { en: 'Magic Duel', zh: '魔法对决' },
    check: { primary: 'intelligence', secondary: 'willpower', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Spell Blocked!', zh: '法术格挡！' },
      contents: [
        { en: 'Blocked a fireball with one hand! My palm is smoking but it looks SO cool in the photo.', zh: '单手挡住了火球！手心冒烟但照片看起来超酷。' },
        { en: 'The mage thought they had me, but I deflected their spell like a pro. Magic 101!', zh: '法师以为能打中我，但我像专业人士一样弹开了法术。魔法入门课！' },
        { en: 'Caught the spell mid-air and sent it right back. The look on their face was priceless!', zh: '半空中接住法术然后反弹回去。对方的表情简直无价！' }
      ],
      tags: ['#magic', '#cool', '#fireball'],
      materials: 5
    },
    failure: {
      title: { en: 'Crispy...', zh: '烤焦了...' },
      contents: [
        { en: 'Got hit by a fireball. My face is charred black, only my eyes are white. Classic.', zh: '被火球击中了。脸烧黑了，只剩眼睛是白的。经典。' },
        { en: 'Tried to block the spell. Failed. Now I look like a burnt marshmallow.', zh: '试图格挡法术。失败了。现在我看起来像烤焦的棉花糖。' },
        { en: 'Magic duel score: Mage 1, Me 0. Also my eyebrows are gone.', zh: '魔法对决比分：法师1，我0。另外我的眉毛没了。' }
      ],
      tags: ['#magic', '#burned', '#fail'],
      materials: 1
    }
  },
  {
    id: 'combat_knight',
    category: 'combat',
    name: { en: 'Knight Sparring', zh: '骑士切磋' },
    check: { primary: 'strength', secondary: 'endurance', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Blades Crossed!', zh: '剑锋相交！' },
      contents: [
        { en: 'Crossed swords with a passing knight! Sparks flew everywhere. What a shot!', zh: '与路过的骑士剑锋相交！火花四溅。绝佳的照片！' },
        { en: 'The knight was impressed by my form. We exchanged a respectful nod after the clash.', zh: '骑士对我的剑术印象深刻。交锋后我们互相点头致意。' },
        { en: 'Steel met steel in a beautiful display. Even the knight complimented my stance!', zh: '钢铁与钢铁的碰撞，美丽的展示。连骑士都夸赞我的姿势！' }
      ],
      tags: ['#swords', '#knight', '#sparks'],
      materials: 5
    },
    failure: {
      title: { en: 'Too Heavy...', zh: '太重了...' },
      contents: [
        { en: 'Couldn\'t lift the heavy sword... fell forward with it. The knight just sighed.', zh: '举不起重剑...连人带剑向前扑倒了。骑士只是叹了口气。' },
        { en: 'Tried to look cool with a greatsword. Ended up eating dirt. Literally.', zh: '想用巨剑耍帅。结果吃了一嘴土。字面意思。' },
        { en: 'The sword was heavier than expected. I am now one with the ground.', zh: '剑比想象中重。我现在和地面融为一体了。' }
      ],
      tags: ['#swords', '#weak', '#embarrassing'],
      materials: 1
    }
  },
  {
    id: 'combat_mimic',
    category: 'combat',
    name: { en: 'Mimic Chest', zh: '清理宝箱怪' },
    check: { primary: 'intelligence', secondary: 'luck', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Mimic Spotted!', zh: '识破宝箱怪！' },
      contents: [
        { en: 'Spotted the mimic before it could bite! Stomped on the lid and claimed the loot inside.', zh: '在宝箱怪咬人之前识破了它！一脚踩住盖子，拿走了里面的战利品。' },
        { en: 'Nice try, mimic. I saw those teeth. Kicked it shut and took what I wanted.', zh: '想得美，宝箱怪。我看到那些牙齿了。踢上盖子拿走了我想要的。' },
        { en: 'The mimic thought it was clever. I was cleverer. Easy loot!', zh: '宝箱怪以为自己很聪明。我更聪明。轻松拿到战利品！' }
      ],
      tags: ['#mimic', '#loot', '#smart'],
      materials: 6
    },
    failure: {
      title: { en: 'CHOMP!', zh: '被咬住了！' },
      contents: [
        { en: 'Opened the chest and it BIT MY HEAD. Can\'t shake it off. Help.', zh: '打开宝箱结果咬住了我的头。甩不掉。救命。' },
        { en: 'The mimic got my hand. It\'s been 10 minutes. We\'re bonded now I guess.', zh: '宝箱怪咬住了我的手。已经10分钟了。我们大概是绑定了。' },
        { en: 'Lesson learned: not all treasure chests are friendly. This one is attached to my arm.', zh: '教训：不是所有宝箱都是友好的。这个现在挂在我胳膊上。' }
      ],
      tags: ['#mimic', '#ouch', '#trapped'],
      materials: 1
    }
  },
  {
    id: 'combat_ghost',
    category: 'combat',
    name: { en: 'Ghost Encounter', zh: '驱散幽灵' },
    check: { primary: 'willpower', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Ghost Busted!', zh: '幽灵退散！' },
      contents: [
        { en: 'Used my camera flash to scare off the ghost! It fled screaming into the night.', zh: '用闪光灯把幽灵吓跑了！它尖叫着逃进了夜色中。' },
        { en: 'Stood my ground against the specter. One bright flash and it vanished!', zh: '面对幽灵毫不退缩。一道闪光，它就消失了！' },
        { en: 'The ghost tried to haunt me. I haunted it back with my flash. Who\'s scared now?', zh: '幽灵想吓我。我用闪光灯反吓它。现在谁害怕了？' }
      ],
      tags: ['#ghost', '#brave', '#flash'],
      materials: 4
    },
    failure: {
      title: { en: 'So Cold...', zh: '好冷...' },
      contents: [
        { en: 'The ghost passed right through me. I\'m shivering and slightly blue now...', zh: '幽灵直接穿过了我的身体。我现在瑟瑟发抖，还有点发蓝...' },
        { en: 'Couldn\'t move when the ghost appeared. It went through me and now I can\'t feel my toes.', zh: '幽灵出现时动不了。它穿过我之后我的脚趾都没知觉了。' },
        { en: 'Ghost: 1, Me: 0. Currently wrapped in three blankets and still freezing.', zh: '幽灵：1，我：0。目前裹着三层毯子还是冷。' }
      ],
      tags: ['#ghost', '#cold', '#scared'],
      materials: 1
    }
  }
];

// 2. 【美景】类事件 (Scenery)
export const SCENERY_EVENTS: GameEvent[] = [
  {
    id: 'scenery_meteor',
    category: 'scenery',
    name: { en: 'Meteor Shower', zh: '流星雨' },
    check: { primary: 'luck', secondary: 'speed', mode: 'or', threshold: 50 },
    rarity: 'rare',
    success: {
      title: { en: 'Starfall!', zh: '星陨之夜！' },
      contents: [
        { en: 'Sat on the cliff edge as meteors streaked across the sky. Made so many wishes!', zh: '坐在悬崖边，满天流星划过。许了好多愿望！' },
        { en: 'The meteor shower was breathtaking. Got the perfect shot with stars trailing behind.', zh: '流星雨美得令人窒息。拍到了完美的星轨照片。' },
        { en: 'Watched the sky light up with falling stars. This is why I became an adventurer.', zh: '看着天空被流星点亮。这就是我成为冒险者的原因。' }
      ],
      tags: ['#meteor', '#nightsky', '#wish'],
      materials: 6
    },
    failure: {
      title: { en: 'Missed It...', zh: '错过了...' },
      contents: [
        { en: 'Just raised my camera and... it ended. Only got a photo of dark sky.', zh: '刚举起相机...就结束了。只拍到了漆黑的夜空。' },
        { en: 'Blinked at the wrong moment. The meteor shower is over. Great.', zh: '在错误的时刻眨了眼。流星雨结束了。太棒了。' },
        { en: 'By the time I found a good spot, the show was over. Just darkness now.', zh: '等我找到好位置，表演已经结束了。现在只有黑暗。' }
      ],
      tags: ['#meteor', '#missed', '#sad'],
      materials: 1
    }
  },
  {
    id: 'scenery_aurora',
    category: 'scenery',
    name: { en: 'Aurora Burst', zh: '极光爆发' },
    check: { primary: 'intelligence', secondary: 'luck', mode: 'or', threshold: 45 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Northern Lights!', zh: '北极光！' },
      contents: [
        { en: 'Green ribbons of light danced above me. I feel so small yet so alive!', zh: '绿色的光带在我头顶舞动。感觉自己如此渺小却又如此鲜活！' },
        { en: 'The aurora wrapped around me like a dream. Best photo of my entire journey!', zh: '极光像梦一样笼罩着我。整个旅程最棒的照片！' },
        { en: 'Standing under the aurora, I forgot to breathe. Pure magic.', zh: '站在极光下，我忘记了呼吸。纯粹的魔法。' }
      ],
      tags: ['#aurora', '#magical', '#northernlights'],
      materials: 5
    },
    failure: {
      title: { en: 'Overexposed!', zh: '过曝了！' },
      contents: [
        { en: 'The aurora was too bright! My photo is just a white blob. Ugh.', zh: '极光太亮了！照片只是一团白色。呃。' },
        { en: 'Camera settings were wrong. All I got was a washed-out mess.', zh: '相机设置错了。只拍到了一片惨白。' },
        { en: 'Forgot to adjust exposure. The aurora photo looks like a blank page.', zh: '忘了调曝光。极光照片看起来像白纸。' }
      ],
      tags: ['#aurora', '#fail', '#overexposed'],
      materials: 1
    }
  },
  {
    id: 'scenery_rainbow',
    category: 'scenery',
    name: { en: 'Rainbow', zh: '彩虹' },
    check: { primary: 'luck', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Rainbow\'s End!', zh: '彩虹尽头！' },
      contents: [
        { en: 'Found the end of the rainbow! Reached out and touched the colors.', zh: '找到了彩虹的尽头！伸手触碰了那些色彩。' },
        { en: 'Standing where the rainbow meets the earth. Magical moment captured!', zh: '站在彩虹与大地相接的地方。魔法时刻已捕捉！' },
        { en: 'The rainbow arched right over me. I feel blessed!', zh: '彩虹正好在我头顶拱起。感觉被祝福了！' }
      ],
      tags: ['#rainbow', '#lucky', '#nature'],
      materials: 4
    },
    failure: {
      title: { en: 'Rained Out', zh: '被淋成落汤鸡' },
      contents: [
        { en: 'Sudden downpour! Rainbow gone, and I\'m soaked.', zh: '突然下大雨！彩虹消失了，我被淋透了。' },
        { en: 'The rainbow vanished and left me in the rain. Classic.', zh: '彩虹消失了，把我留在雨中。经典。' },
        { en: 'Chased the rainbow, caught the rain instead.', zh: '追逐彩虹，却只追到了雨水。' }
      ],
      tags: ['#rainbow', '#rain', '#wet'],
      materials: 1
    }
  }
];

// 3. 【美食】类事件 (Food)
export const FOOD_EVENTS: GameEvent[] = [
  {
    id: 'food_bbq',
    category: 'food',
    name: { en: 'Wild BBQ', zh: '野外烤肉' },
    check: { primary: 'intelligence', secondary: 'agility', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Perfect Grill!', zh: '完美烧烤！' },
      contents: [
        { en: 'The meat is sizzling perfectly! Took a big bite with pure happiness.', zh: '肉烤得滋滋冒油！大口咬下，满脸幸福。' },
        { en: 'Golden brown and juicy. Best meal in weeks!', zh: '金黄酥脆又多汁。几周来最棒的一餐！' },
        { en: 'Grilled to perfection. The smell alone is worth the journey.', zh: '烤得恰到好处。光是香味就值得这趟旅程。' }
      ],
      tags: ['#bbq', '#yummy', '#camping'],
      materials: 3
    },
    failure: {
      title: { en: 'Burnt...', zh: '烤焦了...' },
      contents: [
        { en: 'The meat turned into charcoal. Eating sadness tonight.', zh: '肉变成了黑炭。今晚吃的是悲伤。' },
        { en: 'Dropped the meat into the fire. Dinner cancelled.', zh: '肉没拿稳掉进了火堆。晚餐取消。' },
        { en: 'Overcooked it. Now it\'s just a crispy black rock.', zh: '烤过头了。现在只是一块黑石头。' }
      ],
      tags: ['#bbq', '#fail', '#hungry'],
      materials: 0
    }
  },
  {
    id: 'food_tavern',
    category: 'food',
    name: { en: 'Orc Tavern', zh: '兽人酒馆' },
    check: { primary: 'endurance', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Cheers!', zh: '干杯！' },
      contents: [
        { en: 'Raised a mug bigger than my face and cheered with the orcs!', zh: '举起比脸还大的酒杯，和兽人豪爽干杯！' },
        { en: 'Drank with the orcs all night. Made some rowdy friends!', zh: '和兽人喝了一整晚。交了些粗犷的朋友！' },
        { en: 'The orc ale is strong but I held my own. Respect earned!', zh: '兽人麦酒很烈但我撑住了。赢得了尊重！' }
      ],
      tags: ['#tavern', '#drinks', '#orcs'],
      materials: 3
    },
    failure: {
      title: { en: 'Zzz...', zh: '呼呼...' },
      contents: [
        { en: 'One sip and I passed out on the table. So embarrassing...', zh: '喝了一口就趴在桌子上睡着了。太丢人了...' },
        { en: 'The orc ale knocked me out instantly. Woke up with drawings on my face.', zh: '兽人麦酒瞬间把我放倒。醒来脸上全是涂鸦。' },
        { en: 'Couldn\'t handle the drink. The orcs are still laughing.', zh: '喝不了这酒。兽人们还在笑。' }
      ],
      tags: ['#tavern', '#drunk', '#lightweight'],
      materials: 1
    }
  }
];

// 4. 【意外】类事件 (Mishap)
export const MISHAP_EVENTS: GameEvent[] = [
  {
    id: 'mishap_trap',
    category: 'mishap',
    name: { en: 'Hidden Trap', zh: '隐藏陷阱' },
    check: { primary: 'agility', secondary: 'luck', mode: 'or', threshold: 50 },
    rarity: 'common',
    success: {
      title: { en: 'Trap Dodged!', zh: '躲过陷阱！' },
      contents: [
        { en: 'Spotted the trap wire just in time! Did a cool roll to avoid it.', zh: '及时发现了陷阱线！帅气地翻滚躲过。' },
        { en: 'My instincts kicked in and I jumped over the hidden pit. Close call!', zh: '本能反应让我跳过了隐藏的坑。好险！' },
        { en: 'Noticed something off about the ground. Avoided a nasty spike trap!', zh: '发现地面有点不对劲。避开了一个恶心的尖刺陷阱！' }
      ],
      tags: ['#trap', '#dodge', '#lucky'],
      materials: 3
    },
    failure: {
      title: { en: 'Trapped!', zh: '中招了！' },
      contents: [
        { en: 'Stepped right into a net trap. Currently hanging upside down from a tree...', zh: '一脚踩进了网陷阱。现在倒挂在树上...' },
        { en: 'Fell into a pit trap. It\'s not deep but my pride is hurt.', zh: '掉进了坑里。虽然不深但自尊心受伤了。' },
        { en: 'Triggered a paint trap. I\'m now bright pink from head to toe.', zh: '触发了颜料陷阱。现在从头到脚都是粉红色。' }
      ],
      tags: ['#trap', '#fail', '#ouch'],
      materials: 0
    }
  },
  {
    id: 'mishap_bridge',
    category: 'mishap',
    name: { en: 'Rickety Bridge', zh: '摇晃吊桥' },
    check: { primary: 'agility', secondary: 'willpower', mode: 'and', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Bridge Crossed!', zh: '过桥成功！' },
      contents: [
        { en: 'Crossed the swaying bridge like a pro! Even stopped to take a scenic photo.', zh: '像专业人士一样走过摇晃的桥！还停下来拍了风景照。' },
        { en: 'The bridge creaked but held. Made it across with style!', zh: '桥吱吱作响但撑住了。帅气地走了过去！' },
        { en: 'Kept my balance perfectly. The view from the middle was worth it!', zh: '完美保持平衡。桥中间的风景太值了！' }
      ],
      tags: ['#bridge', '#brave', '#scenic'],
      materials: 3
    },
    failure: {
      title: { en: 'Splash!', zh: '扑通！' },
      contents: [
        { en: 'The bridge plank broke and I fell into the river. At least the water was warm?', zh: '桥板断了，我掉进了河里。至少水是温的？' },
        { en: 'Lost my balance halfway across. Currently drying off by the riverbank.', zh: '走到一半失去平衡。目前在河边晾干中。' },
        { en: 'The rope snapped. I\'m now a very wet, very grumpy adventurer.', zh: '绳子断了。我现在是一个湿透的、非常暴躁的冒险者。' }
      ],
      tags: ['#bridge', '#wet', '#fail'],
      materials: 0
    }
  }
];

// 5. 【同伴】类事件 (Companion)
export const COMPANION_EVENTS: GameEvent[] = [
  {
    id: 'companion_elf',
    category: 'companion',
    name: { en: 'Elf Encounter', zh: '精灵邂逅' },
    check: { primary: 'personality', secondary: 'intelligence', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'New Friend!', zh: '新朋友！' },
      contents: [
        { en: 'Made friends with a forest elf! They taught me some nature magic basics.', zh: '和森林精灵交上了朋友！他们教了我一些自然魔法基础。' },
        { en: 'The elf was impressed by my respect for nature. We exchanged travel tips!', zh: '精灵对我尊重自然的态度印象深刻。我们交换了旅行心得！' },
        { en: 'Shared some food with a wandering elf. They gave me a lucky charm in return!', zh: '和一个流浪精灵分享了食物。他们回赠了我一个幸运符！' }
      ],
      tags: ['#elf', '#friend', '#magic'],
      materials: 4
    },
    failure: {
      title: { en: 'Ignored...', zh: '被无视了...' },
      contents: [
        { en: 'The elf looked at me like I was a bug and walked away. Ouch.', zh: '精灵像看虫子一样看了我一眼就走了。好伤。' },
        { en: 'Tried to say hi to an elf. They pretended I didn\'t exist.', zh: '试着和精灵打招呼。他们假装我不存在。' },
        { en: 'The elf muttered something about "clumsy humans" and disappeared.', zh: '精灵嘟囔了句"笨拙的人类"就消失了。' }
      ],
      tags: ['#elf', '#rejected', '#sad'],
      materials: 1
    }
  },
  {
    id: 'companion_merchant',
    category: 'companion',
    name: { en: 'Traveling Merchant', zh: '旅行商人' },
    check: { primary: 'personality', secondary: 'luck', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Good Deal!', zh: '划算交易！' },
      contents: [
        { en: 'Chatted with a merchant and got a great discount! Scored some rare items.', zh: '和商人聊得开心，拿到了大折扣！买到了稀有物品。' },
        { en: 'The merchant liked my stories and threw in some freebies!', zh: '商人喜欢我的故事，送了我一些赠品！' },
        { en: 'Made a friend in the trading business. They\'ll give me deals in the future!', zh: '在商界交了个朋友。以后会给我优惠！' }
      ],
      tags: ['#merchant', '#deal', '#shopping'],
      materials: 5
    },
    failure: {
      title: { en: 'Scammed...', zh: '被坑了...' },
      contents: [
        { en: 'Bought what I thought was a magic potion. It\'s just colored water.', zh: '买了我以为是魔法药水的东西。只是染色水。' },
        { en: 'The merchant sold me a "rare artifact". It fell apart in my hands.', zh: '商人卖给我一个"稀有神器"。在我手里就散架了。' },
        { en: 'Paid way too much for a "discount". I\'m bad at haggling.', zh: '为"折扣价"付了太多钱。我不擅长讨价还价。' }
      ],
      tags: ['#merchant', '#scam', '#broke'],
      materials: 0
    }
  }
];

// 6. 【休息】类事件 (Rest)
export const REST_EVENTS: GameEvent[] = [
  {
    id: 'rest_tent',
    category: 'rest',
    name: { en: 'Tent Setup', zh: '搭帐篷' },
    check: { primary: 'intelligence', secondary: 'agility', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Cozy Camp!', zh: '温馨营地！' },
      contents: [
        { en: 'Set up the perfect campsite! Cozy tent, warm fire, starry sky.', zh: '搭建了完美的营地！温馨的帐篷，温暖的火，满天星空。' },
        { en: 'My tent setup skills are improving! Even made a little porch area.', zh: '我的搭帐篷技术在进步！还做了个小门廊区域。' },
        { en: 'Found the perfect spot under a big tree. Best sleep in days!', zh: '在大树下找到了完美的位置。几天来睡得最好的一觉！' }
      ],
      tags: ['#camping', '#cozy', '#rest'],
      materials: 2
    },
    failure: {
      title: { en: 'Collapsed!', zh: '塌了！' },
      contents: [
        { en: 'The tent collapsed on me in the middle of the night. Slept under the stars... involuntarily.', zh: '帐篷半夜塌在我身上。被迫睡在星空下...' },
        { en: 'Couldn\'t figure out the tent poles. Ended up sleeping in a fabric pile.', zh: '搞不懂帐篷杆怎么用。最后睡在一堆布料里。' },
        { en: 'Set up the tent backwards. The door faces a cliff. Great.', zh: '帐篷搭反了。门对着悬崖。太棒了。' }
      ],
      tags: ['#camping', '#fail', '#tired'],
      materials: 1
    }
  },
  {
    id: 'rest_hotspring',
    category: 'rest',
    name: { en: 'Hot Spring', zh: '温泉' },
    check: { primary: 'luck', secondary: 'intelligence', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Spa Day!', zh: '泡汤日！' },
      contents: [
        { en: 'Found a hidden hot spring! Soaked away all my travel fatigue.', zh: '发现了一个隐藏的温泉！泡走了所有旅途疲劳。' },
        { en: 'The hot spring was perfect temperature. Feel like a new person!', zh: '温泉温度刚刚好。感觉焕然一新！' },
        { en: 'Natural hot spring with a mountain view. This is the life!', zh: '天然温泉配山景。这才是生活！' }
      ],
      tags: ['#hotspring', '#relax', '#spa'],
      materials: 3
    },
    failure: {
      title: { en: 'Too Hot!', zh: '太烫了！' },
      contents: [
        { en: 'Jumped into the hot spring without testing. I\'m now a boiled lobster.', zh: '没试水温就跳进温泉。我现在是只煮熟的龙虾。' },
        { en: 'The "hot spring" was actually a geyser. Got launched into the air.', zh: '"温泉"其实是间歇泉。被喷到了空中。' },
        { en: 'Shared the spring with some territorial monkeys. They won.', zh: '和一些有领地意识的猴子共用温泉。它们赢了。' }
      ],
      tags: ['#hotspring', '#ouch', '#fail'],
      materials: 1
    }
  }
];

// 7. 【稀有】类事件 (Rare)
export const RARE_EVENTS: GameEvent[] = [
  {
    id: 'rare_portal',
    category: 'rare',
    name: { en: 'Mystery Portal', zh: '神秘传送门' },
    check: { primary: 'willpower', secondary: 'luck', mode: 'and', threshold: 55 },
    rarity: 'rare',
    success: {
      title: { en: 'Portal Mastered!', zh: '传送成功！' },
      contents: [
        { en: 'Stepped through the portal and ended up in a crystal cave! Got amazing photos.', zh: '穿过传送门来到了水晶洞穴！拍到了惊人的照片。' },
        { en: 'The portal took me to a floating island. The view was unreal!', zh: '传送门把我带到了浮空岛。景色太不真实了！' },
        { en: 'Traveled through dimensions briefly. Saw colors that don\'t exist here!', zh: '短暂穿越了维度。看到了这里不存在的颜色！' }
      ],
      tags: ['#portal', '#magic', '#adventure'],
      materials: 10
    },
    failure: {
      title: { en: 'Wrong Exit!', zh: '出口错了！' },
      contents: [
        { en: 'The portal spat me out in a swamp. I smell like bog water now.', zh: '传送门把我吐到了沼泽里。我现在闻起来像沼泽水。' },
        { en: 'Ended up exactly where I started. But my clothes are inside out.', zh: '回到了原点。但我的衣服里外翻了。' },
        { en: 'The portal glitched. Half my stuff is now in another dimension.', zh: '传送门出故障了。我一半的东西现在在另一个维度。' }
      ],
      tags: ['#portal', '#fail', '#lost'],
      materials: 2
    }
  },
  {
    id: 'rare_unicorn',
    category: 'rare',
    name: { en: 'Unicorn Sighting', zh: '独角兽目击' },
    check: { primary: 'luck', secondary: 'personality', mode: 'and', threshold: 60 },
    rarity: 'rare',
    success: {
      title: { en: 'Unicorn Friend!', zh: '独角兽之友！' },
      contents: [
        { en: 'A unicorn let me pet it! Its mane sparkled like starlight.', zh: '独角兽让我摸了它！它的鬃毛像星光一样闪烁。' },
        { en: 'The unicorn blessed me with its horn. I feel incredibly lucky!', zh: '独角兽用角祝福了我。感觉运气爆棚！' },
        { en: 'Rode a unicorn through a rainbow. Best day of my entire life!', zh: '骑着独角兽穿越彩虹。我人生中最棒的一天！' }
      ],
      tags: ['#unicorn', '#magical', '#blessed'],
      materials: 12
    },
    failure: {
      title: { en: 'It Ran Away...', zh: '跑掉了...' },
      contents: [
        { en: 'Sneezed at the wrong moment. The unicorn vanished instantly.', zh: '在错误的时刻打了个喷嚏。独角兽瞬间消失了。' },
        { en: 'Tried to take a photo but the flash scared it away.', zh: '想拍照但闪光灯把它吓跑了。' },
        { en: 'The unicorn looked at me, judged me, and left. Ouch.', zh: '独角兽看了我一眼，评判了我，然后离开了。好伤。' }
      ],
      tags: ['#unicorn', '#missed', '#sad'],
      materials: 3
    }
  }
];

// 8. 【时尚】类事件 (Fashion)
export const FASHION_EVENTS: GameEvent[] = [
  {
    id: 'fashion_elf_dress',
    category: 'fashion',
    name: { en: 'Elf Boutique', zh: '精灵服饰店' },
    check: { primary: 'personality', secondary: 'luck', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Stunning Look!', zh: '惊艳造型！' },
      contents: [
        { en: 'Found the perfect elven dress! The fabric shimmers like moonlight.', zh: '找到了完美的精灵裙！面料像月光一样闪烁。' },
        { en: 'The elf tailor customized an outfit just for me. I look magical!', zh: '精灵裁缝为我定制了一套服装。我看起来很有魔力！' },
        { en: 'Scored a rare elven cloak. It changes color with my mood!', zh: '买到了稀有的精灵斗篷。它会随我的心情变色！' }
      ],
      tags: ['#fashion', '#elf', '#beautiful'],
      materials: 4
    },
    failure: {
      title: { en: 'Wrong Size...', zh: '尺码不对...' },
      contents: [
        { en: 'The elf clothes are way too small. I look like a stuffed sausage.', zh: '精灵衣服太小了。我看起来像塞满的香肠。' },
        { en: 'Tried on an elf hat. It covered my entire face.', zh: '试戴了精灵帽子。它盖住了我整张脸。' },
        { en: 'The "one size fits all" was a lie. Ripped the seams immediately.', zh: '"均码"是骗人的。缝线立刻就裂开了。' }
      ],
      tags: ['#fashion', '#fail', '#awkward'],
      materials: 1
    }
  },
  {
    id: 'fashion_hairstyle',
    category: 'fashion',
    name: { en: 'Forest Salon', zh: '森林发廊' },
    check: { primary: 'luck', secondary: 'personality', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'New Look!', zh: '新造型！' },
      contents: [
        { en: 'Got a magical makeover! My hair now has natural flower accessories.', zh: '做了魔法改造！我的头发现在有天然花朵装饰。' },
        { en: 'The forest stylist gave me braids with glowing threads. So pretty!', zh: '森林造型师给我编了带发光丝线的辫子。太美了！' },
        { en: 'New hairstyle with leaves woven in. I\'m one with nature now!', zh: '新发型编入了树叶。我现在与自然融为一体了！' }
      ],
      tags: ['#hair', '#makeover', '#cute'],
      materials: 3
    },
    failure: {
      title: { en: 'Bad Hair Day', zh: '发型灾难' },
      contents: [
        { en: 'The stylist was a bird. My hair is now a nest. Literally.', zh: '造型师是只鸟。我的头发现在是个鸟窝。字面意思。' },
        { en: 'Asked for "natural look". Got twigs and bugs in my hair.', zh: '要求"自然风格"。头发里有树枝和虫子。' },
        { en: 'The magic hair dye turned my hair green. Permanently.', zh: '魔法染发剂把我头发染成了绿色。永久的。' }
      ],
      tags: ['#hair', '#disaster', '#help'],
      materials: 1
    }
  }
];

// 9. 【节日】类事件 (Festival)
export const FESTIVAL_EVENTS: GameEvent[] = [
  {
    id: 'festival_harvest',
    category: 'festival',
    name: { en: 'Harvest Festival', zh: '丰收节' },
    check: { primary: 'endurance', secondary: 'personality', mode: 'or', threshold: 45 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Festival Fun!', zh: '节日狂欢！' },
      contents: [
        { en: 'Danced all night at the harvest festival! Made so many friends.', zh: '在丰收节跳了一整晚舞！交了好多朋友。' },
        { en: 'Won the pumpkin carving contest! My jack-o-lantern was the spookiest.', zh: '赢得了南瓜雕刻比赛！我的南瓜灯最吓人。' },
        { en: 'The harvest feast was amazing. Ate until I couldn\'t move!', zh: '丰收宴太棒了。吃到动不了！' }
      ],
      tags: ['#festival', '#harvest', '#fun'],
      materials: 4
    },
    failure: {
      title: { en: 'Party Pooper', zh: '扫兴了' },
      contents: [
        { en: 'Fell asleep during the festival. Woke up with hay in my hair.', zh: '在节日期间睡着了。醒来头发里全是干草。' },
        { en: 'Ate too much festival food. Spent the rest of the night groaning.', zh: '吃了太多节日食物。剩下的时间都在哼哼。' },
        { en: 'Tripped during the dance and knocked over the harvest display.', zh: '跳舞时绊倒了，撞翻了丰收展示台。' }
      ],
      tags: ['#festival', '#fail', '#embarrassing'],
      materials: 1
    }
  },
  {
    id: 'festival_fireworks',
    category: 'festival',
    name: { en: 'Fireworks Show', zh: '烟花大会' },
    check: { primary: 'luck', secondary: 'agility', mode: 'or', threshold: 45 },
    rarity: 'common',
    success: {
      title: { en: 'Spectacular!', zh: '壮观！' },
      contents: [
        { en: 'Got the perfect spot for the fireworks! The colors were incredible.', zh: '找到了看烟花的完美位置！颜色太美了。' },
        { en: 'The fireworks spelled out my name! (Okay, it was a coincidence, but still!)' , zh: '烟花拼出了我的名字！（好吧，是巧合，但还是很棒！）' },
        { en: 'Caught a falling spark and made a wish. Magical night!', zh: '接住了一颗落下的火花许了愿。神奇的夜晚！' }
      ],
      tags: ['#fireworks', '#beautiful', '#night'],
      materials: 3
    },
    failure: {
      title: { en: 'Smoky...', zh: '烟熏了...' },
      contents: [
        { en: 'Stood downwind from the fireworks. Can\'t stop coughing.', zh: '站在烟花的下风处。咳个不停。' },
        { en: 'A stray firework landed near me. My eyebrows are singed.', zh: '一颗烟花落在我附近。眉毛被烧焦了。' },
        { en: 'Missed the whole show because I was getting snacks.', zh: '因为去买零食错过了整场表演。' }
      ],
      tags: ['#fireworks', '#fail', '#smoky'],
      materials: 1
    }
  }
];

// 10. 【打工】类事件 (Work)
export const WORK_EVENTS: GameEvent[] = [
  {
    id: 'work_guild',
    category: 'work',
    name: { en: 'Guild Quest', zh: '公会任务' },
    check: { primary: 'strength', secondary: 'endurance', mode: 'or', threshold: 50 },
    rarity: 'common',
    success: {
      title: { en: 'Quest Complete!', zh: '任务完成！' },
      contents: [
        { en: 'Finished the guild quest perfectly! Got paid and earned reputation.', zh: '完美完成公会任务！拿到报酬还提升了声望。' },
        { en: 'The guild master was impressed. Might get promoted soon!', zh: '公会长印象深刻。可能很快就能升级了！' },
        { en: 'Easy quest, easy money. This adventuring thing is great!', zh: '简单任务，轻松赚钱。冒险者生活真棒！' }
      ],
      tags: ['#guild', '#quest', '#money'],
      materials: 5
    },
    failure: {
      title: { en: 'Quest Failed...', zh: '任务失败...' },
      contents: [
        { en: 'Couldn\'t complete the quest. The guild is disappointed in me.', zh: '没能完成任务。公会对我很失望。' },
        { en: 'The quest was harder than expected. Came back empty-handed.', zh: '任务比预想的难。空手而归。' },
        { en: 'Failed the quest and had to pay a penalty fee. Ouch.', zh: '任务失败还要付违约金。好痛。' }
      ],
      tags: ['#guild', '#fail', '#broke'],
      materials: 0
    }
  },
  {
    id: 'work_tavern_singer',
    category: 'work',
    name: { en: 'Tavern Performance', zh: '酒馆演出' },
    check: { primary: 'personality', secondary: 'luck', mode: 'or', threshold: 50 },
    rarity: 'uncommon',
    success: {
      title: { en: 'Standing Ovation!', zh: '全场起立！' },
      contents: [
        { en: 'My performance brought the house down! Tips were flying everywhere.', zh: '我的表演引爆全场！小费满天飞。' },
        { en: 'Sang my heart out and the crowd loved it. Free drinks all night!', zh: '全情投入地唱歌，观众超喜欢。整晚免费喝！' },
        { en: 'Even the grumpy bartender cracked a smile. Best gig ever!', zh: '连脾气暴躁的酒保都笑了。最棒的演出！' }
      ],
      tags: ['#music', '#performance', '#tips'],
      materials: 6
    },
    failure: {
      title: { en: 'Booed Off...', zh: '被嘘下台...' },
      contents: [
        { en: 'Forgot the lyrics halfway through. Got pelted with vegetables.', zh: '唱到一半忘词了。被蔬菜砸了一身。' },
        { en: 'My voice cracked on the high note. The crowd booed me off stage.', zh: '高音破音了。观众把我嘘下了台。' },
        { en: 'Tripped on stage and knocked over the ale barrel. Had to run.', zh: '在台上绊倒撞翻了啤酒桶。只能跑路。' }
      ],
      tags: ['#music', '#fail', '#embarrassing'],
      materials: 0
    }
  }
];

// Combined export of all events
export const ALL_EVENTS: GameEvent[] = [
  ...COMBAT_EVENTS,
  ...SCENERY_EVENTS,
  ...FOOD_EVENTS,
  ...MISHAP_EVENTS,
  ...COMPANION_EVENTS,
  ...REST_EVENTS,
  ...RARE_EVENTS,
  ...FASHION_EVENTS,
  ...FESTIVAL_EVENTS,
  ...WORK_EVENTS
];
